// Import Dependencies -------------------------
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const { ppid } = require('process')

// Import Model ---------------------------
// const Guitar = require('./models/guitar')

// Database Connection ---------------------------

const DATABASE_URL = process.env.DATABASE_URL

const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occured: \n', err))

// Create our Express App Object ----------------------
const app = express()

// Middleware ---------------------------------
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

// Routes ------------------------------------
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})



// Create our server listener ----------------------------
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
// END 