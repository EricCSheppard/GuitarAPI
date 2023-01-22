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
const app = require('liquid-express-views')(express())

middleware(app)

// Routes ------------------------------------
app.get('/', (req, res) => {
    const {username, loggedIn, userId} = req.session
    res.render('home.liquid', {username, loggedIn, userId})
})  

app.use('/guitars', GuitarRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist'
    res.render('error.liquid', { error })
})

// Catch all route
app.all('*', (req, res) => {
    res.redirect('/error')
})

// Server listener ----------------------------
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
// END 