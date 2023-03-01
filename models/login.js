const mongoose = require('mongoose')
const { Schema } = mongoose

const loginSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: v => {
                return /[A-Za-z0-9.-]@[A-Za-z0-9.-]+\.[a-z]/.test(v)
            },
            message: "Invalid Email"
        },
        required: [true, 'Email is Required.']
    },
    password: {
        type: String,
        maxlength: 255,
        required: [true, 'Password is Required.']
    }
})

module.exports = mongoose.model('Login', loginSchema)