const { default: mongoose } = require("mongoose");

const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    timing: {
        type: String,
    },
    start_time: {
        type: String,
        required: false
    },
    end_time: {
        type: String,
        required: false
    },
    quote: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    opening_hours: [
        {
            day: {
                type: String
            },
            timings: {
                type: String
            }
        }
    ],
    review: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String
            }
        }
    ],
    like_count: {
        type: Number,
        default: 0
    },
    media: {
        website_url: {
            type: String,
        },
        maps_url: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    mall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mall',
        required: true
    },
    established_date: {
        type: Date,
        required: false
    },
    floor: {
        type: String,
        required: false
    },
    store_number: {
        type: String,
        required: false
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: false
        }
    ],
}, { timestamps: true, versionKey: false })

customSchema.index({ name: 1, mall: 1 }, { unique: true });

const Store = mongoose.model('Store', customSchema)
module.exports = Store