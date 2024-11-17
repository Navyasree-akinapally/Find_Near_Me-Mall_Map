const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const asyncHandler = require('express-async-handler');
const storeCtrl = require('../../controllers/admin/store.controller');
const userCtrl = require('../../controllers/admin/user.controller');

const router = express.Router()

module.exports = router;

router.get('/', asyncHandler(getUsers))

router.get('/admin-count', asyncHandler(getAdminCount))

router.get('/customer-count', asyncHandler(getCustomersCount))



async function getUsers(req, res, next) {
    try {
        const response = await userCtrl.getUsers(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getAdminCount(req, res, next) {
    try {
        const response = await userCtrl.getAdminCount(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getCustomersCount(req, res, next) {
    try {
        const response = await userCtrl.getCustomersCount(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}


