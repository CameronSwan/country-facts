import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import authService from '../services/authService';

const Register = ({ changeUsername }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = e => {
        setErrors({})
        e.preventDefault()
        authService.register({firstName, lastName, email, password}, e => {
            if (!e) {
                changeUsername()
                navigate('/')
            }
            else if (e.status === 422) setErrors(e.data.errors)
            else if (e.status === 400) setErrors(e)
        })
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>
            <input type="text" id="inputFirstName" className="form-control" placeholder="First Name..." autoFocus onChange={e => setFirstName(e.target.value)}/>
            {
                errors.firstName &&
                <div className='alert alert-danger'>{errors.firstName.message}</div>
            }
            <input type="text" id="inputLastName" className="form-control mt-2" placeholder="Last Name.." onChange={e => setLastName(e.target.value)}/>
            {
                errors.lastName &&
                <div className='alert alert-danger'>{errors.lastName.message}</div>
            }
            <input type="text" id="inputEmail" className="form-control mt-2" placeholder="Email Address..." onChange={e => setEmail(e.target.value)}/>
            {
                errors.email &&
                <div className='alert alert-danger'>{errors.email.message}</div>
            }
            <input type="text" id="inputPassword" className="form-control mt-2" placeholder="Password..." onChange={e => setPassword(e.target.value)}/>
            {
                errors.password &&
                <div className='alert alert-danger'>{errors.password.message}</div>
            }
            {
                errors.data &&
                <div className='alert alert-danger'>{errors.data}</div>
            }
            <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Register</button>
        </form>
     );
}

export default Register;