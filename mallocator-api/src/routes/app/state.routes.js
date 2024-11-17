const express = require('express');
const { resStatusCode, resMsg } = require('../../../config/constants');
const { createError, createResponse } = require('../../../utils/helpers');
const mallCtrl = require('../../controllers/mall.controller');

const router = express.Router()

module.exports = router;

router.get('/', getStates)

router.get('/:stateId/cities', getCitiesByState)

router.get('/states/:stateName/cities/:cityName/malls', getMallsByCity)



async function getStates(req, res, next) {
    try {
        const response = await mallCtrl.getStates(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getCitiesByState(req, res, next) {
    try {
        const response = await mallCtrl.getCitiesByState(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getCitiesByState(req, res, next) {
    try {
        const response = await mallCtrl.getCitiesByState(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getMallsByCity(req, res, next) {
    try {
        const response = await mallCtrl.getMallsByCity(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}



