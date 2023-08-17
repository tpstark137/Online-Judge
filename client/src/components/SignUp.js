import React, { useEffect } from "react"
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[cpassword,setCpassword]=useState("")
    const [username, setName] = useState("")
    const [userid, setUserid] = useState("")
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth)
        {
            navigate('/')
        }
    })

    const handleClick = async() => {
        console.log({ username, email, password ,cpassword,userid});
        let result=await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password ,cpassword,userid}),
            headers: {
                "Content-Type": "application/json"
            },
    })
        result=await result.json();
        console.warn(result)
        localStorage.setItem("user",JSON.stringify(result));
        console.log(result)
        if(result)
        {
          navigate('/')
          
        }
    }

    return (
        <div className="container mt-5">
           
            <h1 className="text-white">Account Registration</h1>

            <div className="col-sm-8">
                <div className="card">
                    <div className="card-body">
                        <div className="form-group">
                            <label >User Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="form-control"
                                name="username"
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                onChange={(e) => setCpassword(e.target.value)}
                                type="password"
                                className="form-control"
                                name="password"
                            />
                            <br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Set User Id</label>
                            <input
                                onChange={(e) => setUserid(e.target.value)}
                                type="text"
                                className="form-control"
                                name="userid"
                            />
                            <br />
                        </div>
                        <button onClick={handleClick} className="btn btn-dark mb-3">
                            Register
                        </button>


                        <div className="create_accountinfo">
                            <p>Already Resistered ?</p>
                            <NavLink to='/login' ><button className="mb-3 btn btn-dark">Go to Login Page</button></NavLink>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    )



}
export default Login