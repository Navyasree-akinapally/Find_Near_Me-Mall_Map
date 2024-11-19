const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const asyncHandler = require('express-async-handler');
const productCtrl = require('../../controllers/mallAdmin/product.controller');

const router = express.Router()

module.exports = router;

router.post('/', asyncHandler(createProduct))

router.get('/', asyncHandler(getAllProducts))

router.get('/:productId', asyncHandler(getProductById))

router.patch('/:productId', asyncHandler(updateProductById))

router.delete('/:productId', asyncHandler(deleteProductById))


async function createProduct(req, res, next) {
    try {
        const response = await productCtrl.createProduct(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getAllProducts(req, res, next) {
    try {
        const response = await productCtrl.getAllProducts(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getProductById(req, res, next) {
    try {
        const response = await productCtrl.getProductById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateProductById(req, res, next) {
    try {
        const response = await productCtrl.updateProductById(req);
        if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
        return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteProductById(req, res, next) {
    try {
        const response = await productCtrl.deleteProductById(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}


