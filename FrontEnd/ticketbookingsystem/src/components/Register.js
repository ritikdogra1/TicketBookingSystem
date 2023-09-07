import React, { useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';


const Register = () => {
  
  const [user, setUser] = useState({
    //Id: 0,
    Name: '',
    Address: '',
    Email: '',
    //Password: '',
    Role: '',
    Token: '',
  });
  const [errors, setErrors] = useState({
    Name: '',
    Address: '',
    Email: '',
   // Password: '',
  });

  function resetForm(){
    setUser({Id:"",Name:"",Address:"",Email:""});
    setErrors({ Name: '', Address: '', Email: ""});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic form validation
      if (!user.Name || !user.Address || !user.Email ) {
        setErrors({
          Name: user.Name ? '' : 'Name is required',
          Address: user.Address ? '' : 'Address is required',
          Email: user.Email ? '' : 'Email is required',
          //Password: user.Password ? '' : 'Password is required',
        });
        return;
      }
      const response = await axios.post('https://localhost:7014/api/User/register', user);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
    //resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar/>
    <form onSubmit={handleSubmit}>
      <div className="container">
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)',backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '400px'}}>
      <div className="row justify-content-center">
       <div className="col-md-10 col-lg-6 col-xl-5">
       <div className="card text-black" style={{ borderRadius: '10px', background: 'rgba(280, 280, 255, 0.8)' }}>
        <div className="card-body">
           <div className="text-center text-info">
            <p className="h1 fw-bold mb-5 mt-4"> UserRegister</p>
            </div>
            <div className="mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <input
              type="text"
              className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
              name="Name"
              placeholder="Enter the Name"
              onChange={handleInputChange}
            />
            {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
            </div>
            <div className="mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <input
              type="text"
              className={`form-control ${errors.Address ? 'is-invalid' : ''}`}
              name="Address"
              placeholder="Enter the Address"
              onChange={handleInputChange}
            />
            {errors.Address && <div className="invalid-feedback">{errors.Address}</div>}
             </div>
             <div className="mb-4">
             <i className="fas fa-user fa-lg me-3 fa-fw"></i>
             <input
              type="text"
              className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
              name="Email"
              placeholder="Enter the Email"
              onChange={handleInputChange}
            />
            {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
             {/* </div>
             <div className="mb-4">
             <input
              type="password"
              className={`form-control ${errors.Password? 'is-invalid' : ''}`}
              name="Password"
              placeholder="Enter the Password"
              onChange={handleInputChange}
            />
            {errors.Password && <div className="invalid-feedback">{errors.Password}</div>} */}
               </div>
               <div className='text-center'>
                <button className='btn btn-info' type="submit">SignIn</button>
                <p className='text-center text-info p-2 m-1'>
                     Already Registered Plz Click LogIn
                     <br />
                     <div className='p-2 m-1'>
                     <span className="line">
                       <a href="/Login" className='btn btn-danger'>LogIn</a>
                     </span>
                     </div>
                       </p>
                       </div>
                       </div>
                     </div>
                </div>
              </div>
         </div>
         </div>
   </form> 
   </div>
  );
};

export default Register;

