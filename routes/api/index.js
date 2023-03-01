const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const songsRouter = require('./songs')
const countriesRouter = require('./countries')

router.use('/users', usersRouter)
router.use('/songs', songsRouter)
router.use('/countries', countriesRouter)

module.exports = router