const { default: mongoose } = require("mongoose");

const customSChema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    resource: {
        type: String,
        required: true
    },

    actions: [
        {
            type: String,
            enum: ['CREATE', 'READ', 'UPDATE', 'DELETE']
        }
    ]
})

const Permission = mongoose.model('Permission', customSChema)

module.exports = Permission