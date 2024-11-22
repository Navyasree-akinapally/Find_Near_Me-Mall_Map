const { handleControllerError } = require("../../utils/helpers")
const User = require("../models/user.model")


const checkMallAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id

        const user = await User.findById(userId).populate('assigned_malls')
        if (!user || user.role !== 'malladmin') {
            return createResponse(res, resStatusCode.FORBIDDEN, {
                message: 'Admin not found.'
            });
        }

        req.malls = user.assigned_malls

        next()
    } catch (e) {
        throw handleControllerError(e)
    }
}


const checkMallAdminAccess = async (req, res, next) => {
    try {
        const userId = req.user_id
        const mallId = req.params.mallId

        const user = await User.findById(userId).populate('assigned_malls')
        if (!user || user.role !== 'malladmin') {
            return createResponse(res, resStatusCode.FORBIDDEN, {
                message: 'Acess Denied. not a mall Admin'
            });
        }

        const hasAccess = user.assigned_malls.some(mall => mall._id.toString() === mallId);

        if (!hasAccess) {
            return createResponse(res, resStatusCode.FORBIDDEN, {
                message: 'You do not have access to this mall'
            });
        }

        next()
    } catch (e) {
        throw handleControllerError(e)
    }
}

module.exports = {
    checkMallAdminAccess,
    checkMallAdmin
}