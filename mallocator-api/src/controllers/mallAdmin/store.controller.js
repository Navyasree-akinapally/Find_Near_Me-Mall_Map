const Joi = require("joi");
const { handleControllerError } = require("../../../utils/helpers");
const Store = require("../../models/store.model");
const Mall = require("../../models/mall.model");
const { isValidObjectId } = require("mongoose");

const storeSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    isOpen: Joi.boolean().default(true),
    phone: Joi.number().optional(),
    email: Joi.string().optional().email(),
    category: Joi.string().required(),
    openingHours: Joi.array().items(
        Joi.object({
            day: Joi.string().required(),
            timings: Joi.string().required()
        })
    ),
    start_time: Joi.string().optional().allow(null),
    end_time: Joi.string().optional().allow(null),
    media: Joi.object({
        website_url: Joi.string().optional().allow(null),
        facebook: Joi.string().optional().allow(null),
        instagram: Joi.string().optional().allow(null),
        twitter: Joi.string().optional().allow(null),
        maps_url: Joi.string().optional().allow(null)
    }).optional().allow(null),
    mall: Joi.string().required(),
    established_date: Joi.date().required(),
    floor: Joi.string().optional(),
    store_number: Joi.string().optional(),
    image_url: Joi.string().required()
});

const openingHoursSchema = Joi.object({
    day: Joi.string().required(),
    timings: Joi.string().required()
});

const mediaSchema = Joi.object({
    website_url: Joi.string().optional(),
    facebook: Joi.string().optional(),
    instagram: Joi.string().optional(),
    twitter: Joi.string().optional()
});

const storeCtrl = {
    createStore,
    getStore,
    getStoreById,
    updateStoreById,
    deleteStoreById,
    addOpeningHours,
    addMediaLinks,
    getTopCategories
}

module.exports = storeCtrl;

async function createStore(req) {
    try {
        const { error } = storeSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const existingStore = await Store.findOne({
            name: req.body.name,
            mall: req.body.mall
        })

        if (existingStore) {
            throw Error("Store already exists")
        }

        const store = new Store({ ...req.body, user_id: req.user._id });

        console.log(store);

        await store.save();

        await Mall.findByIdAndUpdate(req.body.mall, {
            $push: {
                stores: store._id
            }
        })

        if (req.body.floor && req.body.store_number) {
            await Mall.findOneAndUpdate(
                {
                    _id: req.body.mall,
                    'available_floors.floor': req.body.floor,
                    'available_floors.store_numbers.store_number': req.body.store_number,
                    'available_floors.store_numbers.store_id': { $eq: null }  // Ensure store_id is null before updating
                },
                {
                    $set: { 'available_floors.$[floor].store_numbers.$[store].store_id': store._id }
                },
                {
                    arrayFilters: [
                        { 'floor.floor': req.body.floor },
                        { 'store.store_number': req.body.store_number }
                    ]
                }
            );
        }


        return store

    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStore(req) {
    try {
        const mallIds = req.malls.map(mall => mall._id)
        const store = await Store.aggregate([
            {
                $lookup: {
                    from: 'malls',
                    localField: 'mall',
                    foreignField: '_id',
                    as: 'mallDetails'
                },
            },
            {
                $lookup: {
                    from: 'states',
                    localField: 'mallDetails.state',
                    foreignField: '_id',
                    as: 'stateDetails'
                }
            },
            {
                $unwind: '$mallDetails'
            },
            {
                $unwind: '$stateDetails'
            },
            {
                $match: {
                    'mallDetails._id': { $in: mallIds }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'
            },
            {
                $lookup: {
                    from: 'cities',
                    localField: 'mallDetails.city',
                    foreignField: '_id',
                    as: 'cityDetails'
                }
            },
            {
                $unwind: '$cityDetails'
            },
            {
                $project: {
                    name: '$name',
                    description: '$description',
                    isOpen: '$isOpen',
                    mall: '$mallDetails.title',
                    state: '$stateDetails.name',
                    city: '$cityDetails.name',
                    phone: '$phone',
                    category: '$categoryDetails.title',
                    like_count: '$like_count',
                    products: '$products'
                }
            }
        ])
        return store
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStoreById(req) {
    try {
        const { storeId } = req.params;

        const store = await Store.findById(storeId)

        return store
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getTopCategories(req) {
    try {

        const topCategories = await Store.aggregate([
            {
                $group: {
                    _id: "$category", // Group by the category field
                    storeCount: { $sum: 1 }, // Count the number of stores in each category
                },
            },
            {
                $sort: { storeCount: -1 }, // Sort by store count in descending order
            },
            {
                $limit: 4, // Limit to the top 4 categories
            },
            {
                $lookup: {
                    from: "categories", // Reference the Category collection
                    localField: "_id", // Use the grouped category ID
                    foreignField: "_id", // Match with Category collection's _id
                    as: "categoryDetails",
                },
            },
            {
                $unwind: "$categoryDetails", // Flatten the category details array
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the result
                    categoryName: "$categoryDetails.title", // Include category name
                    storeCount: 1, // Include store count
                },
            },
        ]);


        return topCategories
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateStoreById(req) {
    try {
        const { error } = storeSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message);
        }

        const { storeId } = req.params;

        if (!isValidObjectId(storeId)) {
            throw Error('Invalid store id');
        }

        // Fetch the current store data to compare the old floor and store_number
        const existingStore = await Store.findById(storeId);
        if (!existingStore) {
            throw Error('Store not found');
        }

        const { floor: oldFloor, store_number: oldStoreNumber } = existingStore;

        // Update the store details in the Store model
        const updatedStore = await Store.findByIdAndUpdate(
            storeId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        console.log(req.body);
        console.log(oldFloor, oldStoreNumber);

        // If store_number or floor is updated, update the Mall model
        if ((req.body.store_number && req.body.store_number !== oldStoreNumber)) {
            // 1. Set the previous store_number's store_id to null
            if (oldFloor && oldStoreNumber) {
                await Mall.findOneAndUpdate(
                    {
                        _id: req.body.mall,
                        'available_floors.floor': oldFloor,
                        'available_floors.store_numbers.store_number': oldStoreNumber,
                    },
                    {
                        $set: {
                            'available_floors.$[floor].store_numbers.$[store].store_id': null
                        }
                    },
                    {
                        arrayFilters: [
                            { 'floor.floor': oldFloor },
                            { 'store.store_number': oldStoreNumber }
                        ]
                    }
                );
            }
            console.log(updatedStore._id);

            // 2. Update the store_id in the new store_number position
            if (req.body.floor && req.body.store_number) {
                await Mall.findOneAndUpdate(
                    {
                        _id: req.body.mall,
                        'available_floors.floor': req.body.floor,
                        'available_floors.store_numbers.store_number': req.body.store_number,
                        'available_floors.store_numbers.store_id': { $eq: null }  // Ensure store_id is null before updating
                    },
                    {
                        $set: { 'available_floors.$[floor].store_numbers.$[store].store_id': updatedStore._id }
                    },
                    {
                        arrayFilters: [
                            { 'floor.floor': req.body.floor },
                            { 'store.store_number': req.body.store_number }
                        ]
                    }
                );
            }
        }

        return updatedStore;
    } catch (e) {
        throw handleControllerError(e);
    }
}

async function deleteStoreById(req) {
    try {
        const { storeId } = req.params;

        if (!isValidObjectId(storeId)) {
            throw Error('Invalid store id')
        }

        await Store.findByIdAndDelete(storeId)

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}



async function addOpeningHours(req) {
    try {
        const { error } = openingHoursSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const { storeId } = req.params;
        const { day, timings } = req.body;

        const store = await Store.findByIdAndUpdate(storeId,
            {
                $push: {
                    opening_hours: { day, timings }
                }
            },
            { new: true }
        )

        if (!store) {
            throw Error("Store not found")
        }

        return store
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function addMediaLinks(req) {
    try {
        const { error } = mediaSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const { storeId } = req.params;

        const store = await Store.findByIdAndUpdate(storeId,
            { media: req.body },
            { new: true }
        )

        if (!store) {
            throw Error("Store not found")
        }

        return store
    } catch (e) {
        throw handleControllerError(e)
    }
}
