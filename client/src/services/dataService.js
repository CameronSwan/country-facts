import axios from 'axios'

class dataService {

    getCountries(callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/countries`)
        .then(response => {
            callback(response.data)
        })
    }

    getCountry(id, callback) {
        axios.get(`${process.env.REACT_APP_API_URL}/countries/${id}`)
        .then(response => {
            callback(response.data)
        })
    }

    createCountry(data, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/countries`, {
            token: localStorage.getItem('token'),
            data: {
                name: data.name,
                demographics: {
                    population: data.population,
                    area: data.area
                },
                flag: data.flagURL
            }
        })
        .then(() => {
            callback(null)
        })
        .catch(e => {
            callback(e.response)
        })
    }

    updateCountry(id, data, callback) {
        axios.put(`${process.env.REACT_APP_API_URL}/countries/${id}`, {
            token: localStorage.getItem('token'),
            data: {
                name: data.name,
                demographics: {
                    population: data.population,
                    area: data.area
                },
                flag: data.flagURL
            }
        })
        .then(() => {
            callback(null)
        })
        .catch(e => {
            callback(e.response)
        })
    }

    deleteCountry(id, callback) {
        axios.delete(`${process.env.REACT_APP_API_URL}/countries/${id}`)
        .then(() => {
            callback(null)
        })
        .catch(e => {
            callback(e.response)
        })
    }

}

export default new dataService()