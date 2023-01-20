// Schema for the comment subdocument ----------------
const { trusted } = require('mongoose')
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    like: {
        type: Boolean
    },
}, {
    timestamps: true
})

module.exports = commentSchema