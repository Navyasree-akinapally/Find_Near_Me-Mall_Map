const express = require('express');
const { createError, createResponse } = require('../../../utils/helpers');
const { resStatusCode, resMsg } = require('../../../config/constants');
const authCtrl = require('../../controllers/auth.controller');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../../controllers/app/user.controller');

const router = express.Router()

module.exports = router

router.get('/user-details', passport.authenticate('jwt', { session: false }), asyncHandler(getUserDetails))


router.patch('/:storeId/like', passport.authenticate('jwt', { session: false }), asyncHandler(toggleLikeStore))

router.get('/liked-stores', passport.authenticate('jwt', { session: false }), asyncHandler(getLikedStores))

router.patch('/dark-mode', passport.authenticate('jwt', { session: false }), asyncHandler(toggleUserDarkMode))

router.get('/dark-mode', passport.authenticate('jwt', { session: false }), asyncHandler(getUserDarkMode))

async function getUserDetails(req, res, next) {
    try {
        const response = await userCtrl.getUserDetails(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function toggleLikeStore(req, res, next) {
    try {
        const response = await userCtrl.toggleLikeStore(req);
        if (response) return createResponse(res, resStatusCode.LIKE_SUCCESS, resMsg.LIKE_SUCCESS, response);
        return createError(res, resStatusCode.UNABLE_LIKE, { message: resMsg.UNABLE_LIKE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getLikedStores(req, res, next) {
    try {
        const response = await userCtrl.getLikedStores(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function toggleUserDarkMode(req, res, next) {
    try {
        const response = await userCtrl.toggleUserDarkMode(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getUserDarkMode(req, res, next) {
    try {
        const response = await userCtrl.getUserDarkMode(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}