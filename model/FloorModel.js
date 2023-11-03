const mongoose = require('mongoose')

const floorSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    date: {
        type: Date
    },
    address: {
        type: String,
    },
    remarks:{
        type: String,
    },
    mainImage:{
        type:String
    },
    floorDetails:  [
        {
            img: {
                type: [String],
            },
            description: {
                type: String,
            },
            location: {
                type: String,
            },
        }
    ]

})

const FloorPlan = mongoose.model('FloorPlan', floorSchema)

module.exports = FloorPlan