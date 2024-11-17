const { default: mongoose } = require("mongoose");
const { handleControllerError } = require("../../utils/helpers")
const Mall = require("../models/mall.model");
const State = require("../models/state.model");



const mallCtrl = {
    getStates,
    getMallsByStateId,
    getCitiesByState,
    getMallsByCity,
    getStroreCountForMall,
    getStoresInMall
}
module.exports = mallCtrl

async function getStates(req) {
    try {
        const mallCounts = await Mall.aggregate([
            {
                $group: {
                    _id: '$state',
                    mallCount: { $sum: 1 }
                }
            }
        ])

        const stateIds = mallCounts.map((mall) => mall._id);

        const states = await State.find({ _id: { $in: stateIds } })

        const stateWithMallCounts = states.map((state) => ({
            ...state.toObject(),
            mallCount: mallCounts.find((mall) => mall._id.toString() === state._id.toString()).mallCount
        }))
        console.log(stateWithMallCounts);
        return stateWithMallCounts
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getMallsByStateId(req) {
    try {
        const { stateId } = req.params;
        const objectIdStateId = new mongoose.Types.ObjectId(stateId);
        const mallsByState = await Mall.aggregate([
            {
                $lookup: {
                    from: 'states',
                    localField: 'state',
                    foreignField: '_id',
                    as: 'stateDetails'
                }
            },
            {
                $match: {
                    'stateDetails._id': objectIdStateId
                }
            },
            {
                $lookup: {
                    from: 'cities',
                    localField: 'city',
                    foreignField: '_id',
                    as: 'cityDetails'
                }
            },
            {
                $unwind: '$stateDetails'
            },
            {
                $unwind: '$cityDetails'
            },
            {
                $project: {
                    title: 1,
                    state: '$stateDetails.name',
                    city: '$cityDetails.name',
                    stores: 1,
                    location_url: 1
                }
            }
        ])

        return mallsByState
    } catch (e) {
        throw handleControllerError(e)
    }
}


async function getCitiesByState(req) {
    try {
        const { stateId } = req.params
        const cities = await Mall.find({ stateId }).distinct('city')
        if (cities.length === 0) {
            throw Error("No Malls were availbe in the city state")
        }
        return cities
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getMallsByCity(req) {
    try {
        const { state, city } = req.params;

        const malls = await Mall.find({ state, city })

        if (!malls.length) {
            throw Error("No malls found for the specified city")
        }

        return malls
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStroreCountForMall(req) {
    try {
        const { mallId } = req.params;

        const malls = await Mall.findById(mallId).populate('stores')

        if (!malls) {
            throw Error("Mall not found")
        }

        const storeCount = malls.stores.length;

        return storeCount
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getStoresInMall(req) {
    try {
        const { mallId } = req.params;

        const malls = await Mall.findById(mallId).populate('stores')

        if (!malls) {
            throw Error("Mall not found")
        }

        return malls.stores
    } catch (e) {
        throw handleControllerError(e)
    }
}


