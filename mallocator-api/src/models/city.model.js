const { default: mongoose } = require("mongoose");

const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    state: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'state',
            required: true
        }
    ]
})

const City = mongoose.model('city', customSchema)

module.exports = City