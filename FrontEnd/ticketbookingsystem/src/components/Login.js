import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
// import "./log.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import jwt_decode from 'jwt-decode';
import Swal from "sweetalert2";
import Navbar from "./Navbar";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   const refreshPage = ()=>{
  //     window.location.reload();
  //  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // validate input
  //   if (email === "" || password === "") {
  //     setError("Please enter email and password.");
  //     return;
  //   }
  //   // send API call
  //   axios
  //     .post("https://localhost:44308/api/user/authenticate", {
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       alert("User Login");
  //       console.log(response.data);
  //       // do something with the response
  //       navigate("/home");
  //     })
  //     .catch((e) => {
  //       alert(JSON.stringify(e));
  //       console.log(error);
  //       // handle error
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate input
    if (email === "" || password === "") {
      setError("Please enter email and password.");
      return;
    }
    // send API call
    axios
      .post("https://localhost:7014/api/User/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        //alert("User Login");
        if (response.data.id === 13) {
          //alert("Admin Login");
          Swal.fire({
            title: "Admin Login",
            icon: "success",
            position: "top-end",
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem("admin", "true");
              // navigate to home page
              navigate("/");
              window.location.reload();
            }
          });
        } else {
          //alert("User Login");
          //localStorage.removeItem("admin");
          Swal.fire({
            title: "User Login",
            position: "top-end",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("admin");
              navigate("/");
              window.location.reload(); // reload the page
            }
          });
        }
        // store the JWT token in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.id);
       // alert(response.data.id)
        // do something with the response
        //navigate("/home");
        //window.location.reload(); // reload the page
      })
      .catch((e) => {
        setError("Invalid email or password."); // set error state
        Swal.fire({
          title: "Error",
          text: "Invalid email or password.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar/>
      <div style={{ position: 'relative', height: '70vh', width: '100%', backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div
        style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '80%',
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-secondary text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>
              {error && <p className="text-danger">{error}</p>}

              <form onSubmit={handleSubmit}>
                <MDBInput
                  labelClass="text-white"
                  label="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  labelClass="text-white"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="small mb-3 pb-lg-2">
                  <a class="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p>
                <button
                  outline
                  className="btn btn-info"
                  color="white"
                  size="lg"
                  type="submit"
                  // onClick={refreshPage}
                >
                  Login
                </button>
              </form>

              <div className="d-flex flex-row mt-3 mb-5">
                <button
                  tag="a"
                  color="none"
                  className="btn btn-success m-1"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </button>

                <button
                  tag="a"
                  color="none"
                  className="btn btn-primary m-1"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="twitter" size="lg" />
                </button>
                <button
                  tag="a"
                  color="none"
                  className="btn btn-danger m-1"
                  style={{ color: "white" }}
                >
                  <MDBIcon fab icon="google" size="lg" />
                </button>
              </div>
              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="/register" class="text-white-50 fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    </div>
    </div>
  );
}

export default App;
