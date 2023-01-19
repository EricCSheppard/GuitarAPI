// Import Dependencies ---------------------------
const mongoose = require('../utils/connection')
const Guitar = require('./guitar')

const db = mongoose.connection

db.on('open', () => {
    const startGuitars = [
        {
        model: "Stratocaster", 
        make: "Fender", 
        pickups: 3,
        inlineTuners: true,
        strings: 6 },
        {
        model: "Les Paul", 
        make: "Gibson", 
        pickups: 2,
        inlineTuners: false,
        strings: 6 },
        {
        model: "Precision Bass", 
        make: "Fender", 
        pickups: 1,
        inlineTuners: true,
        strings: 4 },
        {
        model: "360-12", 
        make: "Rickenbacker", 
        pickups: 2,
        inlineTuners: false,
        strings: 12 }
    ]
    Guitar.deleteMany({ owner: null })
        .then(() => {
            Guitar.create(startGuitars)
                .then(data => {
                    console.log('here are the created guitars: \n', data)
                    db.close()
                })
                .catch(err => console.log('the following error occurredL \n', err))
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})
