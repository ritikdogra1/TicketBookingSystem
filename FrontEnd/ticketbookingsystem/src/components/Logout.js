import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect the user to the login page after logout
  };

  return (
    
<button className="btn btn-primary " onClick={handleLogout}><i class='fas fa-sign-out-alt' style={{color:'blue'}}/>Logout</button> 
 );
};
export default Logout;
