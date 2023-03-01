const express = require('express')
const router = express.Router()
const Song = require('../../models/song')

router.get('/', (req, res) => {
    Song.find({}, (e, songs) => {
        if (e) res.status(500).send()
        res.json(songs)
    })
})

router.get('/:id', (req, res) => {
    Song.findById(req.params.id, (e, song) => {
        if (e) res.status(400).send()
        if (song) res.json(song)
        res.status(404).send()
    })
})

router.post('/', (req, res) => {
    Song.create(req.body, (e, song) => {
        if (e) res.status(422).send()
        res.status(201).send()
    })
})

router.put('/:id', (req, res) => {
    res.send('Update Song')
})

router.delete('/:id', (req, res) => {
    res.send('Delete Song')
})

module.exports = router