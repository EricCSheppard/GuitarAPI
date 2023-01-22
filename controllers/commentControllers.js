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
    Guitar.findById(guitarId)
        .then(guitar => {
            guitar.comments.push(theComment)
            return guitar.save()
        })
        .then(guitar => {
            res.redirect(`/guitars/${guitar.id}`)
        })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
    } else {
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20fruit`)
    }
})

// DELETE route ------------------------------------

router.delete('/delete/:guitarId/:commId', (req, res) => {
    const { guitarId, commId } = req.params
    Guitar.findById(guitarId)
    .then(guitar => {
        const theComment = guitar.comments.id(commId)
        // console.log('this is the comment to be deleted: \n', theComment)
        if (req.session.loggedIn) {
            if (theComment.author == req.session.userId) {
                theComment.remove()
                guitar.save()
                res.redirect(`/guitars/${guitar.id}`)
            } else {
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        } else {
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
        }
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

module.exports = router