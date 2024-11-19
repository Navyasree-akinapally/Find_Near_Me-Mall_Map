const Joi = require("joi");
const { handleControllerError, isValidObjectId } = require("../../../utils/helpers");
const Products = require("../../models/product.model");
const Store = require("../../models/store.model");


const productCtrl = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}

module.exports = productCtrl

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().optional(),
    store: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required()
})


async function createProduct(req) {
    try {
        const { error } = createProductSchema.validate(req.body)
        if (error) {
            throw Error(error.details[0].message)
        }
        const { store } = req.body;

        if (!isValidObjectId(store)) {
            throw Error("invalid store id")
        }
        const product = new Products(req.body)
        await product.save()

        await Store.findByIdAndUpdate(
            store,
            { $push: { products: product._id } },
            { new: true }
        )

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getAllProducts(req) {
    try {
        const mallIds = req.malls.map(mall => mall._id)
        const products = await Products.aggregate([
            {
                $lookup: {
                    from: 'stores',
                    localField: 'store',
                    foreignField: '_id',
                    as: 'store'
                },
            },
            {
                $unwind: '$store'
            },
            {
                $match: {
                    'store.mall': { $in: mallIds }
                }
            }
        ])

        return products
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getProductById(req) {
    try {
        const { productId } = req.params
        if (!isValidObjectId(productId)) {
            throw Error("Invalid product id: " + productId)
        }
        const products = await Products.findById(productId)

        return products
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateProductById(req) {
    try {
        const { productId } = req.params
        const { store: newStoreId } = req.body

        if (!isValidObjectId(productId)) {
            throw Error("Invalid product id: " + productId)
        }

        const product = await Products.findById(productId)
        if (!product) {
            throw Error("product not found: ")
        }
        const oldStoreId = product.store.toString()

        if (oldStoreId !== newStoreId) {
            await Store.findByIdAndUpdate(
                oldStoreId,
                { $pull: { products: productId } },
                { new: true }
            )

            await Store.findByIdAndUpdate(
                newStoreId,
                { $push: { products: productId } },
                { new: true }
            )
        }
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            { ...req.body },
            { new: true, runValidators: true }
        )

        return updatedProduct
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function deleteProductById(req) {
    try {
        const { productId } = req.params

        if (!isValidObjectId(productId)) {
            throw Error("Invalid product id: " + productId)
        }
        await Products.findByIdAndDelete(productId)

        const product = await Products.findById(productId)

        await Store.findByIdAndUpdate(
            product.store,
            { $pull: { products: productId } },
            { new: true }
        )

        await Products.findByIdAndDelete(productId)

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}