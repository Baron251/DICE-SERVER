const mongoose = require("mongoose")

const DieSchema = new mongoose.Schema({
    sides: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true
    },
    hollow: {
        type: Boolean,
        required: true
    },
    uses: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Die", DieSchema)