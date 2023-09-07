import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from './Logout';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const [isBlocked, setIsBlocked] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); // Redirect the user to the login page after logout
  };
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      // Decode the token to get the userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.unique_name; // Make sure your token has a field named 'userId'
      axios.get(`https://localhost:7014/api/User/${userId}`)
        .then(response => {
          setIsBlocked(response.data.blocked);
          setDecodedToken(decodedToken); // Save the decoded token
        })
        .catch(error => {
          console.error('Error fetching user status:', error);
        });
    }
  }, [isLoggedIn]);
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-danger">
  <a class="navbar-brand" href="#">TicketBookingSystem</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link style=max-width text-white" to={"/"} >Home</Link>
      </li>
      <li className='nav-item'>
        <Link class="nav-link text-white" to={"/Tickets"}>Tickets</Link>
      </li>
      {/* <li className='nav-item'>
        <Link className='nav-link text-white' to={"/AddCart"}>AddCart</Link>
      </li> */}
      <li className='nav-item'>
        <Link class="nav-link text-white" to={"/Booking"}>Booking</Link>
      </li>
      <li className='nav-item'>
        <Link class="nav-link text-white" to={"/UserDetails"}>UserDetails</Link>
      </li>
    </ul>
  </div>
    {!isLoggedIn ? (
                 <>
                   <div className="nav-link">
      <button className='btn btn-success'>
      <Link className="nav-link text-white" to={"/Login"}>Login</Link>
      </button> 
    </div>
    <div className='nav-link'>
      <button className='btn btn-info'>
      <Link class="nav-link text-white" to={"/Register"}>Register</Link>
      </button>
    </div>
                 </>
               ) : (
                <li className=" nav-item logout-container">
                <Logout  onLogout={handleLogout} />
              </li>
               )}
 </nav>
    </div>
  )
}

export default Navbar