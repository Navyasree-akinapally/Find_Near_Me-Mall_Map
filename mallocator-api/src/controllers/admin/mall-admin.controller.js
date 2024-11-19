const Joi = require("joi");
const { handleControllerError } = require("../../../utils/helpers");
const User = require("../../models/user.model");
const Mall = require("../../models/mall.model");
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require("mongoose");

const createMallAdminSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    mallIds: Joi.array(),
    permissions: Joi.array()
})

const mallAdminCtrl = {
    createMallAdmin,
    getMallAdmins,
    getMallAdminPermissions
}

module.exports = mallAdminCtrl;

async function createMallAdmin(req) {
    try {
        const { error } = createMallAdminSchema.validate(req.body)
        if (error) {
            throw Error(error.details[0].message)
        }
        const { username, email, password, mallIds, permissions } = req.body;
        console.log(req.body);


        const malls = await Mall.find({ _id: { $in: mallIds } })

        if (malls.length !== mallIds.length) {
            throw Error("Few mall IDs are invalid")
        }

        const existinguser = await User.findOne({ email })
        if (existinguser) {
            throw Error("Email already in use.")
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const mallAdmin = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'malladmin',
            assigned_malls: mallIds,
            permissions
        })

        await mallAdmin.save()

        return {
            message: 'Mall Admin created successfully. ',
            admin: {
                id: mallAdmin._id,
                username: mallAdmin.username,
                email: mallAdmin.email,
                assignedMalls: mallAdmin.assigned_malls
            }
        }
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getMallAdmins(req) {
    try {
        const mallAdmins = await User.find({ role: 'malladmin' });

        return mallAdmins
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getMallAdminPermissions(req) {
    try {
        const { mallAdminId } = req.params
        if (!isValidObjectId(mallAdminId)) {
            throw Error("invalid admin id")
        }
        const mallAdmins = await User.find({ role: 'malladmin', _id: mallAdminId });

        return mallAdmins
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateMallAdminPermissions(req) {
    try {
        const { adminId } = req.params;

    } catch (e) {
        throw handleControllerError(e)
    }
}