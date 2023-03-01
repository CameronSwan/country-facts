import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import jwt_decode from 'jwt-decode'

import './css/app.css';
import Register from './components/Register';
import Create from './components/Create';
import Edit from './components/Edit';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      username: ''
    }
    this.changeUsername = this.changeUsername.bind(this)
  }

  changeUsername() {
    this.setState({username: jwt_decode(localStorage.getItem('token')).email ?? ''})
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar username={this.state.username} changeUsername={this.changeUsername}/>
          <div id="main-content">
            <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='/signin' element={<SignIn changeUsername={this.changeUsername}/>}/>
              <Route path='/register' element={<Register changeUsername={this.changeUsername}/>}/>
              <Route element={<ProtectedRoutes />}>
                <Route path='/create' element={<Create />}/>
                <Route path='/edit/:id' element={<Edit />}/>
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </React.Fragment>
    )
  }
}

export default App
