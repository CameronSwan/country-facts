const mongoose = require('mongoose')
const { Schema } = mongoose

const countrySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Country Name Required.']
    },
    code: {
        type: String,
        validate: {
            validator: (v) => {
                return /\b[A-Z]{3}\b/.test(v)
            }
        }
    },
    'border-countries': [String],
    demographics: {
        population: Number,
        'offical-languages': [String],
        area: Number
    },
    flag: String
})

module.exports = mongoose.model('Country', countrySchema)