const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const searchCtrl = require('../../controllers/app/search.controller');

const router = express.Router();

module.exports = router;

router.get('/:stateName/:cityName/:keyword/search', searchStoresOnSpecificLocation)

async function searchStoresOnSpecificLocation(req, res, next) {
    try {
        const response = await searchCtrl.searchStoresOnSpecificLocation(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}