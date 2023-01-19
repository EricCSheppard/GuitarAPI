const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


const router = express.Router()

// Routes ------------------------------------

// SIGNUP ------------------------------------
router.post('/signup', async (req, res) => {
    const newUser = req.body
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    User.create(newUser)
    .then(user => {
        res.status(201).json({ username: user.username })
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
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
                    console.log('this is req.session \n', req.session)
                    res.status(201).json({ username: user.username  })
                } else {
                    res.json({ error: 'username or password is incorrect' })
                }
            } else {
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


// LOGOUT ------------------------------------------
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('this is req.session upon logout: \n', req.session)
        res.sendStatus(204)
    })
})

module.exports = router