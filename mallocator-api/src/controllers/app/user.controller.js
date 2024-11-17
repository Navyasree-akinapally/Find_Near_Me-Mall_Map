const { isValidObjectId } = require("mongoose");
const { handleControllerError } = require("../../../utils/helpers");
const Store = require("../../models/store.model");
const User = require("../../models/user.model");

const userCtrl = {
    getUserDetails,
    toggleLikeStore,
    getLikedStores,
    toggleUserDarkMode,
    getUserDarkMode
}

module.exports = userCtrl

async function getUserDetails(req) {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        return user;
    } catch (e) {
        throw handleControllerError(e)
    }
}


async function toggleLikeStore(req) {
    try {
        const userId = req.user._id;
        console.log(userId);
        const { storeId } = req.params;

        const user = await User.findById(userId);
        const store = await Store.findById(storeId)

        if (!user) {
            throw Error('User not found')
        }

        const isLiked = user.liked_stores.includes(storeId);

        if (isLiked) {
            user.liked_stores = user.liked_stores.filter(id => id.toString() !== storeId)
            store.like_count = Math.max(0, store.like_count - 1);

        } else {
            user.liked_stores.push(storeId)
            store.like_count += 1
        }
        user.markModified('liked_stores');

        await user.save();
        await store.save()

        return isLiked ? 'Store unliked' : 'Store liked';

    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getLikedStores(req) {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            throw Error("user not found")
        }
        return user.liked_stores

    } catch (e) {
        throw handleControllerError(e)
    }
}

async function toggleUserDarkMode(req) {
    try {
        const userId = req.user._id;

        const { darkMode } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            dark_mode: darkMode
        }, { new: true });

        await user.save()

        if (!user) {
            throw Error("user not found")
        }
        return user
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getUserDarkMode(req) {
    try {
        const userId = req.user._id;

        if (!isValidObjectId(userId)) {
            throw Error('invalid user id')
        }

        const user = await User.findOne(userId)

        if (!user) {
            throw Error("user not found")
        }
        return user
    } catch (e) {
        throw handleControllerError(e)
    }
}

