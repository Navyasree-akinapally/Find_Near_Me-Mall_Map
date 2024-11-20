const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const mallCtrl = require('../../controllers/admin/mall.controller');
const asyncHandler = require('express-async-handler');
const stateCtrl = require('../../controllers/admin/state.controller');
const cityCtrl = require('../../controllers/admin/city.controller');

const router = express.Router()

module.exports = router;


router.get('/:stateId', asyncHandler(getCitiesByState))

async function getCitiesByState(req, res, next) {
    try {
        const response = await cityCtrl.getCitiesByState(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

