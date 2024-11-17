const express = require('express');
const { createResponse, createError } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const cateogryCtrl = require('../../controllers/app/category.controller');

const router = express.Router()

module.exports = router;

router.use('/:mallId', getCategoriesByMall)

async function getCategoriesByMall(req, res, next) {
    try {
        const response = await cateogryCtrl.getCategoriesByMall(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}