import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';


export default function Navbar(props) {
  return (
    
<nav className={`${ styles.navbar} navbar navbar-expand-lg`}>
  <div className="container-fluid">
    <button className="navbar-toggler" 
    type="button" data-bs-toggle="collapse" 
    data-bs-target="#navbarTogglerDemo03"
   aria-controls="navbarTogglerDemo03" 
   aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="Home">NOXE</Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      {props.userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link className="nav-link" to="Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Tvshows">Tvshow</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="People">People</Link>
        </li>

      </ul>:''}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <div className="social-icon d-flex align-items-center">
          <i className='fab mx-2 fa-facebook'></i>
          <i className=' fab mx-2 fa-spotify'></i>
          <i className='fab  mx-2 fa-instagram'></i>
          <i className=' fab mx-2 fa-youtube'></i>
        </div>


    {props.userData?<li className="nav-item">
          <a onClick={props.logout} className="nav-link" >Logout</a>
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link" to="Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Signup">Sign up</Link>
        </li>
        </>}        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-dark" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>  )
}
