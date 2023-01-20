const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


const router = express.Router()

// Routes ------------------------------------

// GET -> /users/signup
// Renders a liquid page with the sign up form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

// SIGNUP ------------------------------------
router.post('/signup', async (req, res) => {
    const newUser = req.body
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    User.create(newUser)
    .then(user => {
        res.redirect('/users/login')
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=username%20taken`)
    })
})

// GET -> /users/login
// renders a liquid page with the login form
router.get('/login', (req, res) => {
    res.render('users/login')
})

// LOGIN -------------------------------------
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    User.findOne( { username })
        .then(async (user) => {
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    // console.log('this is req.session \n', req.session)
                    res.redirect('/')
                } else {
                    res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }
            } else {
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET -> /users/logout
// This route renders a page that allows the user to logout
router.get('/logout', (req, res) => {
    res.render('users/logout')
})


// LOGOUT ------------------------------------------
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        // console.log('this is req.session upon logout: \n', req.session)
        res.redirect('/')
    })
})

module.exports = router