const express = require('express');
const mallAdminCtrl = require('../../controllers/admin/mall-admin.controller');
const asyncHandler = require('express-async-handler');
const { createError, createResponse } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');

const router = express.Router()

module.exports = router


router.post('/create-mall-admin', asyncHandler(createMallAdmin))

router.get('/', asyncHandler(getMallAdmins))

async function createMallAdmin(req, res, next) {
    try {
        const response = await mallAdminCtrl.createMallAdmin(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getMallAdmins(req, res, next) {
    try {
        const response = await mallAdminCtrl.getMallAdmins(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}