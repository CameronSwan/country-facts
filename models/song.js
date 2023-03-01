const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema({
    title: String,
    artist: String,
    releaseYear: Number,
    genres: [String],
    ratings: [Number]
})

module.exports = mongoose.model('Song', songSchema)