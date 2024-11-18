const Joi = require("joi");
const { handleControllerError } = require("../../utils/helpers");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require("../../config/config");
const uuid = require('uuid');
const sendMail = require("../../config/mail");



const signUpValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().optional()
})

const loginValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const forgetPasswordSchema = Joi.object({
    email: Joi.string().email().required()
})

const resetPasswordSchema = Joi.object({
    token: Joi.string().required().label("token"),
    password: Joi.string().required(),
    confirm_password: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm password")
});

const authCtrl = {
    signUp,
    login,
    forgetPassword,
    resetPassword
}

module.exports = authCtrl

async function signUp(req) {
    try {
        const { error } = signUpValidationSchema.validate(req.body)
        if (error) {
            throw Error(error.details[0].message)
        }
        const { username, email, password, role } = req.body;
        const exisitngUser = await User.findOne({ email })

        if (exisitngUser) {
            throw Error("User already exists")
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        })

        await user.save()

        return user
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function login(req) {
    try {
        const { error } = loginValidationSchema.validate(req.body)
        if (error) {
            throw Error(error.details[0].message)
        }
        const { role } = req.params
        if (role !== 'admin' && role !== 'customer') {
            throw Error('Invalid role specified');
        }
        const { email, password } = req.body;
        let user
        if (role === 'admin') {
            user = await User.findOne({ email, role: 'admin' });
            if (!user) {
                throw Error('Admin with this email does not exist');
            }
        } else if (role === 'customer') {
            user = await User.findOne({ email, role: 'customer' });
            if (!user) {
                throw Error('Customer with this email does not exist');
            }
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw Error("Invalid email or password")
        }

        console.log("true");

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            config.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return token
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function forgetPassword(req) {
    try {
        let { error } = forgetPasswordSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw Error('Email dosent Exist')
        }

        const resetToken = uuid.v4();

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiration = Date.now() + 3600000 // token valid for 1 hour

        await user.save();

        const verificationLink = `http://localhost:3000/auth/reset-password/${resetToken}`;
        const mailOptions = {
            to: email,
            subject: 'Verify your email',
            html: `<p>Click on the following link to forget your password: ${verificationLink}</p>`,
        }
        await sendMail(mailOptions)
        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function resetPassword(req) {
    try {
        const { error } = resetPasswordSchema.validate(req.body);
        if (error) {
            throw Error(error.details[0].message)
        }

        const { token, password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiration: { $gt: Date.now() },
        })

        if (!user) {
            throw Error('Invalid or expired reset token')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the users password and reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiration = undefined;
        await user.save();

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}


