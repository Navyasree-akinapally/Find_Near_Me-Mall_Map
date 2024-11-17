const express = require('express');
const { createError, createResponse } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const authCtrl = require('../../controllers/auth.controller');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

const router = express.Router()

module.exports = router;


router.post('/sign-up', signUp)

router.post('/:role/login', login)




async function signUp(req, res, next) {
    try {
        const response = await authCtrl.signUp(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function login(req, res, next) {
    try {
        const response = await authCtrl.login(req);
        if (response) return createResponse(res, resStatusCode.LOGIN, resMsg.LOGIN, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function toggleLikeStore(req, res, next) {
    try {
        const response = await authCtrl.toggleLikeStore(req);
        if (response) return createResponse(res, resStatusCode.LIKE_SUCCESS, resMsg.LIKE_SUCCESS, response);
        return createError(res, resStatusCode.UNABLE_LIKE, { message: resMsg.UNABLE_LIKE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getLikedStores(req, res, next) {
    try {
        const response = await authCtrl.getLikedStores(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}