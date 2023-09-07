import React from 'react'
import axios from 'axios';

const apiUrl = 'https://localhost:7014/api/User/authenticate';
const AuthService = {

    login: (User) => axios.post(`https://localhost:7014/api/User/authenticate`, User),
  };
  
export default AuthService