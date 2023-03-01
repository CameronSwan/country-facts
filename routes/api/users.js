const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../../models/user')
const Login = require('../../models/login')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  const register = new User(req.body)

  register.validate(e => {
    if (e) res.status(422).send(e)
    else {
      User.find({email: req.body.email}, (e, users) => {
        if (e) throw e
        if (users.length != 0) res.status(400).send('User Already Exists.')
        else {
          bcrypt.hash(req.body.password, 10, (e, hash) => {
            if (e) throw e
            req.body.password = hash
            User.create(req.body, (e, user) => {
              if (e) throw e
              if (!user) res.status(422).send('Validation Failed.')
              jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '365d'}, (e, token) => {
                res.header('Access-Control-Expose-Headers', 'x-auth-token')
                res.header('x-auth-token', token)
                res.status(200).json({email: user.email, _id: user._id})
              })
            })
          })
        }
      })
    }
  })
})

router.post('/login', (req, res) => {
  const login = new Login(req.body)

  login.validate(e => {
    if (e) res.status(422).send(e)
    else {
      User.find({email: req.body.email}, (e, users) => {
        if (e) res.status(400).send(e)
        if (users.length === 0) res.status(404).send('User Not Found.')
        else {
          bcrypt.compare(req.body.password, users[0].password, (e, result) => {
            if (e) res.status(400).send(e)
            if (!result) res.status(401).send('Invalid Password.')
            else {
              jwt.sign({email: users[0].email}, process.env.JWT_SECRET, {expiresIn: '365d'}, (e, token) => {
                res.header('Access-Control-Expose-Headers', 'x-auth-token')
                res.header('x-auth-token', token)
                res.status(200).send({serverMessage: 'Login Succesful.'})
              })
            }
          })
        }
      })
    }
  })
})

module.exports = router