const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const asyncHandler = require('express-async-handler');
const storeCtrl = require('../../controllers/admin/store.controller');

const router = express.Router()

module.exports = router;

router.post('/', asyncHandler(createStore))

router.get('/', asyncHandler(getStore))

router.get('/:storeId', asyncHandler(getStoreById))

router.patch('/:storeId', asyncHandler(updateStoreById))

router.delete('/:storeId', asyncHandler(deleteStoreById))



router.post('/:storeId/opening-hours', asyncHandler(addOpeningHours))

router.post('/:storeId/media', asyncHandler(addMediaLinks))


async function createStore(req, res, next) {
    try {
        const response = await storeCtrl.createStore(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getStore(req, res, next) {
    try {
        const response = await storeCtrl.getStore(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getStoreById(req, res, next) {
    try {
        const response = await storeCtrl.getStoreById(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateStoreById(req, res, next) {
    try {
        const response = await storeCtrl.updateStoreById(req);
        if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
        return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteStoreById(req, res, next) {
    try {
        const response = await storeCtrl.deleteStoreById(req);
        if (response) return createResponse(res, resStatusCode.DELETED, resMsg.DELETED, response);
        return createError(res, resStatusCode.UNABLE_DELETE, { message: resMsg.UNABLE_DELETE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function addOpeningHours(req, res, next) {
    try {
        const response = await storeCtrl.addOpeningHours(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function addMediaLinks(req, res, next) {
    try {
        const response = await storeCtrl.addMediaLinks(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}
