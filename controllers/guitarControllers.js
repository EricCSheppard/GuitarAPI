const express = require('express')
const Guitar = require('../models/guitar')

const router = express.Router()

// INDEX route ------------------------------------------

router.get('/', (req, res) => {
    const {username, loggedIn, userId} = req.session
    Guitar.find({})
    .then(guitars => {
        res.render('guitars/index', { guitars, username, loggedIn, userId })
    })
    .catch (err => {
        console.log(err)
        res.status(404).json(err)
    })
})

// SUBMIT a new guitar ---------------------------------
router.get('/new', (req, res) => {
    res.render('guitars/new', {...req.session})
    })

// CREATE route ------------------------------------------

router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    const newGuitar = req.body
    Guitar.create(newGuitar)
    .then(guitar => {
        res.redirect(`/guitars/${guitar.id}`)
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

// GET route ---------------------------------------------

router.get('/mine', (req, res) => {
    Guitar.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(guitars => {
            res.render('guitars/index', { guitars, ...req.session })
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

//GET Request --------------------------------------------
router.get('/edit/:id', (req, res) => {
    const guitarId = req.params.id
    Guitar.findById(guitarId)
    .then(guitar => {
        res.render('guitars/edit', {guitar, ...req.session})
    })
    .catch(err => {
        res.redirect(`/error?error=${err}`)
    })
})


// UPDATE route -------------------------------------------

router.put('/:id', (req, res) => {
    const id = req.params.id
    Guitar.findById(id)
    .then(guitar => {
        if (guitar.owner == req.session.userId) {
            // res.sendStatus(204)
            return guitar.updateOne(req.body)
        } else {
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20guitar`)
        }
    })
    .then(() => {
        res.redirect('/guitars/mine')
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
})

// DELETE route --------------------------------------------

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Guitar.findById(id)
    .then(guitar => {
        if (guitar.owner == req.session.userId) {
            return guitar.deleteOne()
        } else {
            res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20guitar`)
        }
    })
    .then(() => {
        res.redirect('/guitars/mine')
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
})

// SHOW route ---------------------------------------------

router.get('/:id', (req, res) => {
    const id = req.params.id
    Guitar.findById(id)
    .populate('owner', 'username')
    .populate('comments.author', '-password')
    .then(guitar => {
        res.render('guitars/show.liquid', {guitar, ...req.session})
    })
    .catch(err => {
        console.log(err)
        res.redirect(`/error?error=${err}`)
    })
})

module.exports = router