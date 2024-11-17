const { default: mongoose } = require("mongoose");

const customSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
        required: true,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    available_floors: [
        {
            floor: {
                type: String,
                required: true,
            },
            store_numbers: [
                {
                    store_number: {
                        type: String,
                        required: false,
                    },
                    store_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Store',
                        required: false
                    }
                }
            ]
        }
    ],
    stores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location_url: {
        type: String,
        required: false,
    }

}, { timestamps: true, versionKey: false })

const Mall = mongoose.model('Mall', customSchema)

module.exports = Mall