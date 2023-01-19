const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

const guitarSchema = new Schema({
    model: {
        type: String
    }, 
    make: { 
        type: String
    }, 
    pickups: { 
        type: Number,
    },
    inlineTuners: {
        type: Boolean,
    },
    strings: { 
        type: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Guitar = model('Guitar', guitarSchema)

module.exports = Guitar