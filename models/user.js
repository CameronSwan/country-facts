const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        maxlength: 100,
        required: [true, 'First Name is Required.']
    },
    lastName: {
        type: String,
        maxlength: 100,
        required: [true, 'Last Name is Required.']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: v => {
                return /[A-Za-z0-9.-]@[A-Za-z0-9.-]+\.[a-z]/.test(v)
            }
        },
        required: [true, 'Email is Required.']
    },
    password: {
        type: String,
        maxlength: 255,
        required: [true, 'Password is Required.']
    }
})

module.exports = mongoose.model('User', userSchema)