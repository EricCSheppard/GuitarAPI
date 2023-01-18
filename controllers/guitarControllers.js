const express = require('express')
const Guitar = require('../models/guitar')

const router = express.Router()

// INDEX route ->
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

router.get('/seed', (req, res) => {
    // array of starter fruits
    const startGuitars = [
      { model: "Stratocaster", 
        make: "Fender", 
        pickups: 3,
        inlineTuners: true,
        strings: 6 },
    ]
  
    // Delete all fruits
    Guitar.deleteMany({}).then((data) => {
      // Seed Starter Fruits
      Guitar.create(startGuitars)
        .then((data) => {
        // send created fruits as response to confirm creation
          res.json(data)
        })
    })
  })

module.exports = router