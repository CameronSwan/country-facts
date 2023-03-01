import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import authService from '../services/authService';


const SignIn = ({ changeUsername }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = e => {
        setErrors({});
        e.preventDefault()
        authService.signin({email, password}, e => {
            if (!e) {
                changeUsername()
                navigate('/')
            }
            else if (e.status === 422) setErrors(e.data.errors)
            else if (e.status === 401) setErrors(e)
        })
    }

    return ( 
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Sign-in</h1>
            <input type="text" id="inputEmail" className="form-control" placeholder="Email Address..." autoFocus onChange={e => setEmail(e.target.value)}/>
            {
                errors.email &&
                <div className='alert alert-danger'>{errors.email.message}</div>
            }
            <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Password..." onChange={e => setPassword(e.target.value)}/>
            {
                errors.password &&
                <div className='alert alert-danger'>{errors.password.message}</div>
            }
            {
                errors.data &&
                <div className='alert alert-danger'>{errors.data}</div>
            }
            <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign-in</button>
        </form>
     );
}
 
export default SignIn;