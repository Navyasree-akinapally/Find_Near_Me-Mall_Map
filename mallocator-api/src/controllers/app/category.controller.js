const { default: mongoose } = require("mongoose");
const { handleControllerError } = require("../../../utils/helpers");
const Mall = require("../../models/mall.model");
const Category = require("../../models/cateogry.model");


const cateogryCtrl = {
    getCategoriesByMall
}

module.exports = cateogryCtrl


async function getCategoriesByMall(req) {
    try {
        const { mallId } = req.params;
        const categories = await Mall.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(mallId) } },
            {
                $lookup: {
                    from: 'stores',
                    localField: 'stores',
                    foreignField: '_id',
                    as: 'storeDetails'
                }
            },
            { $unwind: '$storeDetails' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'storeDetails.category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            { $unwind: '$categoryDetails' },
            {
                $group: {
                    _id: '$categoryDetails._id',
                    categoryName: { $first: '$categoryDetails.title' },
                    storeCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: '$_id',
                    categoryName: 1,
                    storeCount: 1
                }
            }
        ])

        return categories;
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getAllCategories(req) {
    try {
        const categories = await Category.find()

        return categories;
    } catch (e) {
        throw handleControllerError(e)
    }
}


