const mongoose = require('mongoose')

const customSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        trim: true,
        default: null,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        required: true,
        default: 'customer'
    },
    reset_password_token: {
        type: String,
        required: false,
    },
    reset_password_token_expiration: {
        type: Number,
        required: false,
    },
    liked_stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }
    ],
    dark_mode: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const User = mongoose.model('User', customSchema)
module.exports = User;