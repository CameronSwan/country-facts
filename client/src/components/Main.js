import React, { useEffect, useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';

const Main = (props) => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dataService.getCountries(res => {
      setCountries(res)
    })
  }, [])

  const onDelete = (id) => {
    const approve = prompt('Type DELETE to delete.')
    if (approve === 'DELETE') {
      dataService.deleteCountry(id, () => {
        const updatedCountries = countries.filter(country => {
          return country._id !== id
        })
        setCountries(updatedCountries)
      })
    }
  }

  return ( 
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search this site" onChange={e => setFilter(e.target.value)}/>
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">

            {
              countries.map(country => {
                return (
                  <Card country={country} onDelete={onDelete} key={country._id}/>
                )
              }).filter(country => {
                return country.props.country.name.toLowerCase().includes(filter.toLowerCase())
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Main;