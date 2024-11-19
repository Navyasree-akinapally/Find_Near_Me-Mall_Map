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
        enum: ['malladmin', 'customer', 'superadmin'],
        required: true,
        default: 'customer'
    },
    assigned_malls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mall'
        }
    ],
    permissions: [
        {
            type: String,
            enum: ['CREATE', 'READ', 'UPDATE', 'DELETE']
        }
    ],
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
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordTokenExpiration: {
        type: Date,
        required: false,
    },
}, { timestamps: true })

customSchema.methods.toMallAdmin = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        assigned_malls: this.assigned_malls,
        permissions: this.permissions,
        role: this.role
    }
}

const User = mongoose.model('User', customSchema)
module.exports = User;