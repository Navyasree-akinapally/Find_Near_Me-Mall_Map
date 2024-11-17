const { default: mongoose } = require("mongoose");


const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        }
    ]
})

const State = mongoose.model('state', customSchema)

module.exports = State