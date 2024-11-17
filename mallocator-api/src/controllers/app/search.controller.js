const { default: mongoose } = require("mongoose");
const { handleControllerError } = require("../../../utils/helpers");
const Category = require("../../models/cateogry.model");
const City = require("../../models/city.model");
const Mall = require("../../models/mall.model");
const State = require("../../models/state.model");
const Store = require("../../models/store.model");

const searchCtrl = {
    searchStoresOnSpecificLocation
}

module.exports = searchCtrl;

async function searchStoresOnSpecificLocation(req) {
    try {
        const { stateName, cityName, keyword } = req.params;

        console.log(req.params);

        const state = await State.findOne({ name: stateName });
        const city = await City.findOne({ name: cityName, state: state?._id })

        if (!state || !city) {
            throw Error('State or city not found')
        }
        const regex = new RegExp(keyword, 'i')
        console.log(String(city._id));
        const stores = await Store.aggregate([
            {
                $lookup: {
                    from: 'malls',
                    localField: 'mall',
                    foreignField: '_id',
                    as: 'mallDetails'
                },
            },
            { $unwind: '$mallDetails' },
            {
                $match: {
                    name: regex,
                    'mallDetails.city': city._id
                }
            }

        ])

        console.log(stores);

        return stores

    } catch (e) {
        throw handleControllerError(e)
    }
}