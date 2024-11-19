const { resStatusCode } = require("../../config/constants");
const { isValidObjectId, createResponse } = require("../../utils/helpers");
const User = require("../models/user.model");

const checkSuperAdmin = async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId || !isValidObjectId(userId)) {
            return createResponse(res, resStatusCode.UNAUTHORIZED, {
                message: 'Unauthorized: User ID not provided or invalid.'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return createResponse(res, resStatusCode.FORBIDDEN, {
                message: 'Admin not found.'
            });
        }

        if (user.role !== 'superadmin') {
            return createResponse(res, resStatusCode.FORBIDDEN, {
                message: 'Forbidden: You do not have Super Admin access.'
            });
        }

        // User is a superadmin, proceed to the next middleware
        next();

    } catch (error) {
        console.error("Error in checkSuperAdmin middleware:", error);
        return createResponse(res, resStatusCode.INTERNAL_SERVER_ERROR, {
            message: 'Something went wrong while checking super admin access.'
        });
    }
};

module.exports = {
    checkSuperAdmin,
};
