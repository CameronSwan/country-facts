const express = require('express')
const router = express.Router()
const Country = require('../../models/country')
const validateToken = require('../../middleware/validateToken')
const Create = require('../../models/create')

router.get('/', (req, res) => {
    Country.find({}, (e, countries) => {
        if (e) res.status(500).send()
        res.json(countries)
    })
})

router.get('/:id', (req, res) => {
    Country.findById(req.params.id, (e, country) => {
        if (e) res.status(400).send()
        if (country) res.send(country)
        res.status(404).send()
    })
})

router.post('/', validateToken, (req, res) => {
    const create = new Create(req.body.data)

    create.validate(e => {
        if (e) res.status(422).send(e)
        else {
            Country.create(req.body.data, (e, country) => {
                if (e) res.status(422).send()
                else if (country) res.status(201).send()
                else res.status(404).send()
            })
        }
    })
})

router.put('/:id', validateToken, (req, res) => {
    const update = new Create(req.body.data)

    update.validate(e => {
        if (e) res.status(422).send(e)
        else {
            Country.findByIdAndUpdate(req.params.id, {
                name: req.body.data.name,
                demographics: {
                    population: req.body.data.demographics.population,
                    area: req.body.data.demographics.area
                },
                flag: req.body.data.flag
            }, (e, country) => {
                if (e) {
                    console.log(e)
                    res.status(400).send()
                }
                else if (country) res.status(200).send()
                else res.status(404).send()
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    Country.findByIdAndDelete(req.params.id, (e, country) => {
        if (e) res.status(400).send()
        else if (country) res.status(200).send()
        else res.status(404).send()
    })
})


module.exports = router