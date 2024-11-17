const User = require("../../models/user.model");


const userCtrl = {
    getUsers,
    getAdminCount,
    getCustomersCount
}

module.exports = userCtrl;

async function getUsers(req) {
    try {
        const users = await User.find()
        return users
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getAdminCount(req) {
    try {
        const users = await User.find({ role: 'admin' })
        return users.length
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getCustomersCount(req) {
    try {
        const users = await User.find({ role: 'customer' })
        return users.length
    } catch (e) {
        throw handleControllerError(e)
    }
}