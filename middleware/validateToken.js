const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    console.log(req)
    if (!req.body.token) res.status(401).send('No Token.')
    jwt.verify(req.body.token, process.env.JWT_SECRET, (e, decoded) => {
        if (e) res.status(400).send()
        else if (decoded) next()
        else res.status(401).send('Invalid Token.')
    })
}

module.exports = validateToken