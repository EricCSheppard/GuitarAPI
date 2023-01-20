// Import Dependencies -------------------------
const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const GuitarRouter = require('./controllers/guitarControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')



// Create our Express App Object ----------------------
const app = express()

middleware(app)

// Routes ------------------------------------
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests.')
})

app.use('/guitars', GuitarRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

// Server listener ----------------------------
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
// END 