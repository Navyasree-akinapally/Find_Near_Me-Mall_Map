const express = require('express');
const categoryCtrl = require('../../controllers/admin/category.controller');
const asyncdHandler = require('express-async-handler');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const router = express.Router()

module.exports = router;

router.post('/', asyncdHandler(createCategory))

router.get('/', asyncdHandler(getCatogories))

router.get('/:categoryId', asyncdHandler(getCategoryById))

router.patch('/:categoryId', asyncdHandler(updateCategoryById))

router.delete('/:categoryId', asyncdHandler(deleteCategoryById))


async function createCategory(req, res, next) {
    try {
        const response = await categoryCtrl.createCategory(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getCatogories(req, res, next) {
    try {
        const response = await categoryCtrl.getCatogories(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getCategoryById(req, res, next) {
    try {
        const response = await categoryCtrl.getCategoryById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateCategoryById(req, res, next) {
    try {
        const response = await categoryCtrl.updateCategoryById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteCategoryById(req, res, next) {
    try {
        const response = await categoryCtrl.deleteCategoryById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

