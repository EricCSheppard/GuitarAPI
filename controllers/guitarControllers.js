const express = require('express')
const Guitar = require('../models/guitar')

const router = express.Router()

// INDEX route ------------------------------------------
router.get('/', (req, res) => {
    Guitar.find({})

    .then(guitars => {
        res.json({ guitars: guitars })
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
        .populate('owner', '-password')
        .then(guitars => {
            res.status(200).json({ guitars: guitars })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})


module.exports = router