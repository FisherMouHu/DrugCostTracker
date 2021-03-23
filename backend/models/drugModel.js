const mongoose = require('mongoose')

const Schema = mongoose.Schema

const drugSchema = new Schema({
    brandName: { type: String, required: true },
    name: { type: String, required: true },
    symptoms: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true,
})

const Drug = mongoose.model('Drug', drugSchema)

module.exports = Drug