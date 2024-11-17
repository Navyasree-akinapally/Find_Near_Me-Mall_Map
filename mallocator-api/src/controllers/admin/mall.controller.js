const Joi = require("joi");
const { handleControllerError, isValidObjectId } = require("../../../utils/helpers");
const Mall = require("../../models/mall.model");

const mallSchema = Joi.object({
    title: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    locations: Joi.array().items(
        Joi.object({
            floor: Joi.string().optional(),
            storeNumbers: Joi.array().items(
                Joi.object({
                    store_number: Joi.string().optional()
                })
            ).optional()
        })
    ).allow(null),
    location_url: Joi.string().optional().allow(null)
});

const addStoreToMallSchema = Joi.object({
    storeId: Joi.string().required()
});

const mallCtrl = {
    createMall,
    addStoreToMall,
    getAllMalls,
    getMallById,
    updateMallById,
    deleteMallById,
    getTotalMalls
}

module.exports = mallCtrl;

async function createMall(req) {
    try {
        const { error } = mallSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }
        const existingMall = await Mall.findOne({
            title: req.body.title,
            state: req.body.state,
            city: req.body.city
        })

        if (existingMall) {
            throw Error("Mall already exists")
        }

        const { locations, ...body } = req.body;
        console.log(locations);
        const available_floors = locations.map(location => ({
            floor: location.floor,
            store_numbers: location.storeNumbers.map(store => ({
                store_number: store.store_number,
                store_id: null
            }))
        }));
        const mall = new Mall({
            ...body,
            available_floors,
            user: req.user._id
        });
        await mall.save();

        return mall
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getAllMalls(req) {
    try {
        const malls = await Mall.aggregate([
            {
                $lookup: {
                    from: 'stores',
                    localField: 'stores',
                    foreignField: '_id',
                    as: 'stores'
                }
            },
            {
                $lookup: {
                    from: 'cities',
                    localField: 'city',
                    foreignField: '_id',
                    as: 'city'
                }
            },
            {
                $lookup: {
                    from: 'states',
                    localField: 'state',
                    foreignField: '_id',
                    as: 'state'
                }
            },
            {
                $unwind: "$city"  // If city and state fields are single objects instead of arrays
            },
            {
                $unwind: "$state"
            },
            {
                $addFields: {
                    available_floors: {
                        $map: {
                            input: '$available_floors',
                            as: 'floor',
                            in: {
                                floor: '$$floor.floor',
                                store_numbers: {
                                    $filter: {
                                        input: '$$floor.store_numbers',
                                        as: 'store',
                                        cond: {
                                            $or: [
                                                { $eq: ['$$store.store_id', null] },  // Match where store_id is null
                                                { $eq: ['$$store.store_id', ''] },    // Match where store_id is an empty string
                                                { $not: { $ifNull: ['$$store.store_id', false] } } // Match where store_id is missing (undefined or null)
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);
        return malls
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getMallById(req) {
    try {
        const { mallId } = req.params;
        if (!isValidObjectId(mallId)) {
            throw Error("invalid mallId")
        }
        const mall = await Mall.findById(mallId)
        return mall
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateMallById(req) {
    try {
        const { error } = mallSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }
        const { mallId } = req.params;
        if (!isValidObjectId(mallId)) {
            throw Error("Invalid mall id")
        }

        const { locations, ...body } = req.body
        console.log(locations);

        const mall = await Mall.findById(mallId);
        if (!mall) {
            throw new Error("Mall not found");
        }

        if (locations !== null) {
            locations.forEach((location) => {
                const existingFloor = mall.available_floors.find(floor => floor.floor === location.floor);

                if (existingFloor) {
                    // Loop through the store numbers and check if any already exists
                    location.storeNumbers.forEach(storeNumber => {
                        console.log(storeNumber.store_number);
                        console.log(existingFloor.store_numbers);

                        // Check if the store number already exists in the floor's store_numbers
                        const storeExists = existingFloor.store_numbers.some(
                            (store) => store.store_number === storeNumber.store_number
                        );

                        console.log(storeExists);

                        if (storeExists) {
                            // If the store number already exists, throw an error
                            throw new Error(`Store number ${storeNumber.store_number} already exists on floor ${location.floor}`);
                        } else {
                            // If not, add the store number
                            existingFloor.store_numbers.push(storeNumber);
                        }
                    });
                } else {
                    // If the floor doesn't exist, create a new floor and add store numbers
                    mall.available_floors.push({
                        floor: location.floor,
                        store_numbers: location.storeNumbers
                    });
                }
            });
        }

        Object.assign(mall, body)

        await mall.save()

        return mall
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function deleteMallById(req) {
    try {
        const { mallId } = req.params;
        if (!isValidObjectId(mallId)) {
            throw Error("invalid mallId")
        }
        await Mall.findByIdAndDelete(mallId)
        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}



async function addStoreToMall(req) {
    try {
        const { error } = addStoreToMallSchema.validate(req.body)
        if (error) {
            throw Error(error.details[0].message)
        }

        const { mallId } = req.params;

        const { storeId } = req.body;

        const mall = await Mall.findByIdAndUpdate(mallId, {
            $addToSet: {
                stores: storeId
            }
        })

        if (!mall) {
            throw Error("mall not found")
        }

        return mall
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getTotalMalls(req) {
    try {
        const malls = await Mall.find()
        return malls
    } catch (e) {
        throw handleControllerError(e)
    }
}