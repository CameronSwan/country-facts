import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/signin.css';
import dataService from '../services/dataService'

const Edit = () => {
    const [name, setName] = useState('')
    const [flagURL, setFlagURL] = useState('')
    const [population, setPopulation] = useState('')
    const [area, setArea] = useState('')
    const [errors, setErrors] = useState({})
    const { id } = useParams()

    useEffect(() => {
        dataService.getCountry(id, res => {
            setName(res.name)
            setFlagURL(res.flag)
            setPopulation(res.demographics.population)
            setArea(res.demographics.area)
        })
    }, [id])

    const navigate = useNavigate()

    const handleSubmit = e => {
        setErrors({})
        e.preventDefault()
        dataService.updateCountry(id, {name, flagURL, population, area}, e => {
            console.log(e)
            if (!e) navigate('/')
            else if (e.status === 422) setErrors(e.data.errors)
            else if (e.status === 404 || e.status === 400) setErrors(e)
        })
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Edit Country</h1>
            <input type="text" id="inputName" className="form-control" placeholder="Name..." value={name} autoFocus onChange={e => setName(e.target.value)}/>
            {
                errors.name &&
                <div className='alert alert-danger'>{errors.name.message}</div>
            }
            <input type="text" id="inputURL" className="form-control mt-3" placeholder="Flag URL..." value={flagURL} onChange={e => setFlagURL(e.target.value)}/>
            {
                errors.flag &&
                <div className='alert alert-danger'>{errors.flag.message}</div>
            }
            <input type="text" id="inputPopulation" className="form-control mt-3" placeholder="Population..." value={population} onChange={e => setPopulation(e.target.value)}/>
            {
                errors["demographics.population"] &&
                <div className='alert alert-danger'>{errors["demographics.population"].message}</div>
            }
            <input type="text" id="inputArea" className="form-control mt-3" placeholder="Area..." value={area} onChange={e => setArea(e.target.value)}/>
            {
                errors["demographics.area"] &&
                <div className='alert alert-danger'>{errors["demographics.area"].message}</div>
            }
            {
                errors.data &&
                <div className='alert alert-danger'>{errors.data}</div>
            }
            <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Edit</button>
        </form>
     );
}

export default Edit;