const { default: mongoose } = require("mongoose");


const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    in_stock: {
        type: Boolean,
        default: true,
        required: false
    },
    featured: {
        type: Boolean,
        default: true,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["available", "not_available", "coming_soon"],
        default: "available",
    },
},
    {
        timestamps: true,
        versionKey: false
    })


const Products = mongoose.model('Product', customSchema)

module.exports = Products