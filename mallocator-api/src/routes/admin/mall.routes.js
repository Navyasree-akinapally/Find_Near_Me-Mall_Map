const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const mallCtrl = require('../../controllers/admin/mall.controller');
const asyncHandler = require('express-async-handler')

const router = express.Router()

module.exports = router;

router.post('/', asyncHandler(createMall))

router.get('/', asyncHandler(getAllMalls))

router.get('/:mallId', asyncHandler(getMallById))

router.patch('/:mallId', asyncHandler(updateMallById))

router.delete('/:mallId', asyncHandler(deleteMallById))

router.post('/:mallId/stores', asyncHandler(addStoreToMall))

async function createMall(req, res, next) {
    try {
        const response = await mallCtrl.createMall(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getAllMalls(req, res, next) {
    try {
        const response = await mallCtrl.getAllMalls(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getMallById(req, res, next) {
    try {
        const response = await mallCtrl.getMallById(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateMallById(req, res, next) {
    try {
        const response = await mallCtrl.updateMallById(req);
        if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
        return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteMallById(req, res, next) {
    try {
        const response = await mallCtrl.deleteMallById(req);
        if (response) return createResponse(res, resStatusCode.DELETED, resMsg.DELETED, response);
        return createError(res, resStatusCode.DELETED, { message: resMsg.DELETED })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function addStoreToMall(req, res, next) {
    try {
        const response = await mallCtrl.addStoreToMall(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

// async function getTotalMalls(req, res, next) {
//     try {
//         const response = await mallCtrl.getTotalMalls(req);
//         if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
//         return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
//     } catch (e) {
//         return createError(res, resStatusCode.BAD_REQUEST, e)
//     }
// }
