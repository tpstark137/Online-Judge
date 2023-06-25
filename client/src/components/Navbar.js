import React from 'react'
import './style.css'
import { useNavigate, Link } from "react-router-dom";


function Navbar() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/register')
    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                        <span className='logo'>Coding</span>Panda.io
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/problemList">Problems List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/questions">Contribute Question</Link>
                            </li>
                            {

                                auth ?
                                    <li className='nav-item'>
                                        <Link className="nav-link" onClick={logout} to="/register">Logout</Link>
                                    </li> : <>
                                        <li className='nav-item'>
                                            <Link className="nav-link" to="/register">SignUp</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                    </>

                            }

                        </ul>
                    </div>
                </div>

            </nav>

        </div>
    )
}
export default Navbar;