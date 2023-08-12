import React from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'
function Home() {
    const nav = useNavigate()
    return (
        <>
        <div className="jumbotron text-center mt-5  text-white">
            <h1>CodingPanda.io</h1>
            <p className='mt-5'>~ An Online Judge built with MERN Stack</p>
            <br />
            <img src="https://media.tenor.com/y2JXkY1pXkwAAAAC/cat-computer.gif" alt=".gif" />
            <br />
            <p className='mt-3'>Have fun and improve your skills
                <br />
                Beat the challenge faster than your opponent using your ❤ language</p>
            <button onClick={() => nav('/problemList')} className='btn btn-danger mb-5'>Go To Problems List</button>
        </div>
        </>
    )
}
export default Home;