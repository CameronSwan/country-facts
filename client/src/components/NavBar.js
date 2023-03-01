import { Link } from 'react-router-dom';
import authService from '../services/authService';

const NavBar = ({ username, changeUsername }) => {

  function signout() {
    authService.signout()
    changeUsername()
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
        <strong>Countries of the World</strong>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample07">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/create">Add Country</Link>
          </li>
          {
            !localStorage.getItem('token') &&
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Sign-in</Link>
            </li> 
          }
          {
            !localStorage.getItem('token') &&
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          }
          {
            localStorage.getItem('token') &&
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{username}</Link>
              <div className="dropdown-menu" aria-labelledby="dropdown07">
                <Link className="dropdown-item" to="/" onClick={signout}>Sign-out</Link>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  </nav>
  );
}
 
export default NavBar;