const express = require('express')
const Guitar = require('../models/guitar')

const router = express.Router()

// INDEX route ------------------------------------------

router.get('/', (req, res) => {
    Guitar.find({})
    .then(guitars => {
        res.render('guitars/index', { guitars })
    })
    .catch (err => {
        console.log(err)
        res.status(404).json(err)
    })
})

// CREATE route ------------------------------------------

router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    const newGuitar = req.body
    Guitar.create(newGuitar)
    .then(guitar => {
        res.status(201).json({ guitar: guitar.toObject() })
    })
    .catch(err => {
        console.log(err)
        res.status(404).json(err)
    })
})

// GET route ---------------------------------------------

router.get('/mine', (req, res) => {
    Guitar.find({ owner: req.session.userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(guitars => {
            res.status(200).json({ guitars: guitars })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})

// UPDATE route -------------------------------------------

router.put('/:id', (req, res) => {
    const id = req.params.id
    Guitar.findById(id)
    .then(guitar => {
        if (guitar.owner == req.session.userId) {
            res.sendStatus(204)
            return guitar.updateOne(req.body)
        } else {
            res.sendStatus(401)
        }
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
            res.sendStatus(204)
            return guitar.deleteOne()
        } else {
            res.sendStatus(401)
        }
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
        res.json({ guitar: guitar })
    })
    .catch(err => {
        console.log(err)
        res.status(404).json(err)
    })
})

module.exports = router