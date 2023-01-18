// Import Dependencies -------------------------
const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const GuitarRouter = require('./controllers/guitarControllers')
const middleware = require('./utils/middleware')



// Create our Express App Object ----------------------
const app = express()

middleware(app)

// Routes ------------------------------------
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

app.use('/guitars', GuitarRouter)

// Server listener ----------------------------
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
// END 