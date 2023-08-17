import React from "react"
import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/')
    }
  })

  const handleClick = async () => {
    let result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    result = await result.json();
    console.warn(result)
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate('/')
      console.log("User Logged in Successfully")

    }
    else {
      alert("Invalid User")
    }

  }

  return (

    <div className="container mt-5">
      <h1 className="text-white">Login</h1>

      <div className="col-sm-8">
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                name="password"
              />
              <br />
            </div>
            <button onClick={handleClick} className="btn btn-dark mb-3">
              Login
            </button>


            <div className="create_accountinfo">
              <p>New to CodingPanda.io ?</p>
              <NavLink to='/register' ><button className="mb-3 btn btn-dark">Create your Account</button></NavLink>
            </div>

          </div>
        </div>
      </div>

    </div>




  )



}
export default Login