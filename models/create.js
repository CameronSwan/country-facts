const mongoose = require('mongoose')
const { Schema } = mongoose

const createSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Country Name Required.']
    },
    demographics: {
        population: {
            type: Number,
            required: [true, 'Population Required.']
        },
        area: {
            type: Number,
            required: [true, 'Area Required.']
        }
    },
    flag: {
        type: String,
        required: [true, 'Flag URL Required.']
    }
})

module.exports = mongoose.model('Create', createSchema)