const { default: mongoose, isValidObjectId } = require("mongoose");
const { handleControllerError } = require("../../../utils/helpers");
const Store = require("../../models/store.model");
const User = require("../../models/user.model");


const storeCtrl = {
    getStoresByStateAndCity,
    getStoreById,
    getStoresByCategoryAndCity,
    getNewStores
}

module.exports = storeCtrl;

async function getStoresByStateAndCity(req) {
    try {
        const { stateName, cityName } = req.params
        const stores = await Store.aggregate([
            {
                $lookup: {
                    from: 'malls',
                    localField: 'mall',
                    foreignField: '_id',
                    as: 'mallDetails',
                }
            },
            {
                $lookup: {
                    from: 'states',
                    localField: 'mallDetails.state',
                    foreignField: '_id',
                    as: 'stateDetails',
                }
            },
            {
                $lookup: {
                    from: 'cities',
                    localField: 'mallDetails.city',
                    foreignField: '_id',
                    as: 'cityDetails',
                }
            },
            {
                $match: {
                    'stateDetails.name': stateName,
                    'cityDetails.name': cityName
                }
            },
            {
                $unwind: '$cityDetails',
            },
            {
                $unwind: '$mallDetails'
            },
            {
                $unwind: '$stateDetails'
            }, {
                $group: {
                    _id: '$mallDetails._id',
                    mallName: { $first: '$mallDetails.title' },
                    state: { $first: '$stateDetails.name' },
                    city: { $first: '$cityDetails.name' },
                    stores: {
                        $push: {
                            _id: '$_id',
                            name: '$name',
                            description: '$description',
                            category: '$category',
                            contacts: '$contacts',
                            isOpen: '$isOpen',
                            timing: '$timing',
                            like_count: '$like_count',
                            image_url: '$image_url'
                        }
                    },
                    location_url: { $first: '$mallDetails.location_url' },
                    storeCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    mallName: 1,
                    state: 1,
                    city: 1,
                    stores: 1,
                    storeCount: 1,
                    location_url: 1,
                }
            }
        ])

        return stores
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStoreById(req) {
    try {
        const { storeId } = req.params
        console.log('new store');
        if (!isValidObjectId(storeId)) {
            throw Error("invalid store id")
        }
        const store = await Store.findById(storeId).populate('products')
        console.log(store);

        return store
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStoresByCategoryAndCity(req) {
    try {
        const { categoryId, cityName } = req.params;
        console.log(categoryId);
        const stores = await Store.aggregate([
            {
                $lookup: {
                    from: 'malls',
                    localField: 'mall',
                    foreignField: '_id',
                    as: 'mallDetails'
                }
            },
            { $unwind: '$mallDetails' },
            {
                $lookup: {
                    from: 'cities',
                    localField: 'mallDetails.city',
                    foreignField: '_id',
                    as: 'cityDetails'
                }
            },
            { $unwind: '$cityDetails' },
            {
                $match: {
                    'category': new mongoose.Types.ObjectId(categoryId),
                    'cityDetails.name': cityName
                }
            }, {
                $project: {
                    name: 1,
                    isOpen: 1,
                    start_time: 1,
                    end_time: 1,
                    mall: '$mallDetails'
                }
            }
        ])

        console.log(stores);

        return stores
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getNewStores(req) {
    try {
        console.log('new store');
        const thirtyDaysAgo = new Date()

        const { mallId } = req.params

        if (!isValidObjectId(mallId)) {
            throw Error("invalid mall id")
        }

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        console.log(thirtyDaysAgo);
        const newStores = await Store.find({
            established_date: { $gte: thirtyDaysAgo.toISOString() },
            mall: mallId
        })

        console.log(newStores);

        return newStores
    } catch (e) {
        throw handleControllerError(e)
    }
}








