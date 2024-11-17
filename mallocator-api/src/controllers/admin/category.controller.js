const Joi = require("joi")
const { handleControllerError } = require("../../../utils/helpers")
const Category = require("../../models/cateogry.model")
const { isValidObjectId } = require("mongoose")


const categoryCtrl = {
    createCategory,
    getCatogories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}

const categorySchema = Joi.object({
    title: Joi.string().required()
})

module.exports = categoryCtrl

async function createCategory(req) {
    try {
        const { error } = categorySchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        const exisitingCategoryName = await Category.findOne({ title: req.body.title })
        if (exisitingCategoryName) {
            throw Error("Duplicate category")
        }

        const category = new Category(req.body);

        await category.save()

        return category
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getCatogories(req) {
    try {
        const catogories = await Category.find()

        return catogories
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getCategoryById(req) {
    try {
        const { categoryId } = req.params

        if (!isValidObjectId(categoryId)) {
            throw Error('Invalid category id')
        }
        const catogory = await Category.findById(categoryId)
        return catogory
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateCategoryById(req) {
    try {
        const { categoryId } = req.params
        const { error } = categorySchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        if (!isValidObjectId(categoryId)) {
            throw Error('Invalid category id')
        }

        const category = await Category.findByIdAndUpdate(
            categoryId,
            { $set: req.body },
            { new: true }
        )

        if (!category) {
            throw Error("category not found")
        }

        return category
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function deleteCategoryById(req) {
    try {
        const { categoryId } = req.params
        if (!isValidObjectId(categoryId)) {
            throw Error('Invalid category id')
        }
        await Category.findByIdAndDelete(categoryId)

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}

