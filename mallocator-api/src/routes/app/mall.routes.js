const express = require('express');
const mallCtrl = require('../../controllers/mall.controller');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');

const router = express.Router()

module.exports = router;

router.get('/:mallId/stores/count', getStroreCountForMall)

router.get('/:mallId/stores', getStoresInMall)

router.get('/states', getStates)

router.get('/:stateId', getMallsByStateId)


async function getStroreCountForMall(req, res, next) {
    try {
        const response = await mallCtrl.getStroreCountForMall(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getMallsByStateId(req, res, next) {
    try {
        const response = await mallCtrl.getMallsByStateId(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getStoresInMall(req, res, next) {
    try {
        const response = await mallCtrl.getStoresInMall(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getStates(req, res, next) {
    try {
        const response = await mallCtrl.getStates(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}