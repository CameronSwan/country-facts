import axios from 'axios'

class authService {
    
    signin(credentials, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, credentials)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.headers['x-auth-token'])
                callback(null)
            }
        })
        .catch(e => {
            callback(e.response)
        })
    }

    register(credentials, callback) {
        axios.post(`${process.env.REACT_APP_API_URL}/users/register`, credentials)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.headers['x-auth-token'])
                callback(null)
            }
        })
        .catch(e => {
            callback(e.response)
        })
    }

    isAuthenticated() {
        return localStorage.getItem('token') != null
    }

    signout() {
        localStorage.removeItem('token')
    }

    getToken() {
        return localStorage.getItem('token')
    }

}

export default new authService()