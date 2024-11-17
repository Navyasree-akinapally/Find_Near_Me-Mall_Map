const { default: mongoose } = require("mongoose");


const customSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const Category = mongoose.model('category', customSchema)

module.exports = Category