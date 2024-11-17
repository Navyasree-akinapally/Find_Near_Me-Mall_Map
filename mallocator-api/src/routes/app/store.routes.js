const express = require('express');
const mallCtrl = require('../../controllers/mall.controller');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const storeCtrl = require('../../controllers/app/store.controller');
const passport = require('passport');
const asyncHandler = require('express-async-handler')

const router = express.Router()

module.exports = router;

// router.get('/:mallId/stores/count', getStroreCountForMall)

// router.get('/:mallId/stores', getStoresInMall)

// router.get('/states', getStates)

router.get('/:mallId/new-stores', getNewStores)

router.get('/:stateName/:cityName', getStoresByStateAndCity)

router.get('/:storeId', getStoreById)

router.get('/:categoryId/:cityName/category', getStoresByCategoryAndCity)





async function getStoresByStateAndCity(req, res, next) {
    try {
        const response = await storeCtrl.getStoresByStateAndCity(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getStoreById(req, res, next) {
    try {
        const response = await storeCtrl.getStoreById(req);
        console.log(response);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}


async function getStoresByCategoryAndCity(req, res, next) {
    try {
        const response = await storeCtrl.getStoresByCategoryAndCity(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getNewStores(req, res, next) {
    try {
        const response = await storeCtrl.getNewStores(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}



