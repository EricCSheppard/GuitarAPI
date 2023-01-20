// Import Dependencies -------------------------
const express = require('express') // import the express framework
const Guitar = require('../models/guitar')
const router = express.Router()

// POST ----------------------------------

router.post('/:guitarId', (req, res) => {
    const guitarId = req.params.guitarId
    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    const theComment = req.body
    // find a specific fruit
    Guitar.findById(guitarId)
        .then(fruit => {
            fruit.comments.push(theComment)
            return fruit.save()
        })
        .then(guitar => {
            res.status(201).json({ guitar: guitar })
        })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
    } else {
        res.sendStatus(401)
    }
})

// DELETE route ------------------------------------

router.delete('/delete/:guitarId/:commId', (req, res) => {
    const { guitarId, commId } = req.params
    Guitar.findById(guitarId)
    .then(guitar => {
        const theComment = guitar.comments.id(commId)
        console.log('this is the comment to be deleted: \n', theComment)
        if (req.session.loggedIn) {
            if (theComment.author == req.session.userId) {
                theComment.remove()
                guitar.save()
                res.sendStatus(204)
            } else {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
})

module.exports = router