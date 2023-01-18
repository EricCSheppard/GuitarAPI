const mongoose = require('mongoose')

const { Schema, model } = mongoose

const guitarSchema = new Schema({
    model: String, 
    make: String, 
    pickups: Number,
    inlineTuners: Boolean,
    strings: Number
})

const Guitar = model('Guitar', guitarSchema)

module.exports = Guitar