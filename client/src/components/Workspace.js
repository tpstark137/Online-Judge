import React, { useState, useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";
import { NavLink } from 'react-router-dom';

function Workspace() {
    const [code, setCode] = React.useState("");

    const [lang, setLang] = useState("");
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [userInput, setUserInput] = useState('')
    const [Q, setQ] = useState('')
    const [codeout, setCodeout] = useState("")
    const [main, setMain] = useState(false)
    const [result, setResult] = useState(false);
    const [accepted, setAccepted] = useState(false);

    let verdict = "";

    const userid = JSON.parse(localStorage.getItem("user")).id;
    const params = useParams()
    const callProblem = async () => {
        try {
            let result = await fetch('http://localhost:3000/questions/' + params.uniquename, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            result = await result.json();

            const irows = result.Q.input.split("~");
            const allirows = irows.join("\n");
            setInput(allirows);
            const orows = result.Q.output.split("~");
            const allorows = orows.join("\n");
            setOutput(allorows);
            setQ(result.Q);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callProblem();
    }, []);

    const change = (lan) => {
        setLang(lan)
    }
    const handleRun = async (e) => {
        setMain(true)
        console.log(userInput, code, lang)
        try {
            e.preventDefault();
            if (lang === "") {
                window.alert("Please select a language first");
            }
            if (code === "") {
                window.alert("First write some code");
            }
            const response = await fetch(`http://localhost:3000/run`, {
                method: 'POST',
                body: JSON.stringify({ language: lang, code: code, input: userInput }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json();
            console.log(data);


            const newOut = data.output;
            const norows = newOut.split("\r\n");
            const allnorows = norows.join("\n");

            let modout = allnorows;
            if (modout.slice(-2) === "\r\n") {
                modout = modout.slice(0, -2);
            }
            if (modout.slice(-1) === "\n") {
                modout = modout.slice(0, -1);
            }
            if (modout.slice(-1) === " ") {
                modout = modout.slice(0, -1);
            }

            setCodeout(modout);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        setMain(true)
        setResult(true)
        try {
            e.preventDefault();
            if (lang === "") {
                window.alert("Please select a language first");
            }
            if (code === "") {
                window.alert("First write some code");
            }
            const response = await fetch(`http://localhost:3000/run`, {
                method: 'POST',
                body: JSON.stringify({ language: lang, code: code, input: input }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json();
            console.log(data);


            const newOut = data.output;
            const norows = newOut.split("\r\n");
            const allnorows = norows.join("\n");

            let modout = allnorows;
            if (modout.slice(-2) === "\r\n") {
                modout = modout.slice(0, -2);
            }
            if (modout.slice(-1) === "\n") {
                modout = modout.slice(0, -1);
            }
            if (modout.slice(-1) === " ") {
                modout = modout.slice(0, -1);
            }
            if (modout === output) {
                verdict = "Accepted";
                setAccepted(true);
            }
            else {
                verdict = "Wrong Answer";
                setAccepted(false);
            }


            const result = await fetch(`http://localhost:3000/addsubmission`, {
                method: 'POST',
                body: JSON.stringify({ questionname: params.uniquename, lang: lang, code: code, verdict: verdict, userid: userid }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const alldata = result.json();
            console.log(alldata);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="mainpage black text-white mt-4">
                <div className="d-flex justify-content-between flex-md-row flex-column">
                    <div className="problem grey rounded overflow-hidden">
                        <ul
                            className="nav nav-tabs" id="myTab" role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                >
                                    <i className="fa-solid fa-code me-2" />
                                    Description
                                </button>
                            </li>

                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active p-3 hh"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                                tabIndex={0}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>{Q ? Q.sequence + ". " + Q.title : null}</h5>

                                    {Q ? <h5 className=" fw-semibold" style={{ color: Q.difficulty === "Easy" ? 'green' : Q.difficulty === "Medium" ? '#F49D1A' : "red" }}>{Q ? Q.difficulty : null}</h5> : null}
                                </div>
                                <hr />
                                < div id="desc">
                                    <div className="content" dangerouslySetInnerHTML={{ __html: Q.description }} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-5 grey solution rounded overflow-hidden mt-md-0 mt-2">
                        <div className="d-flex justify-content-between py-2">
                            <div className="col-md-3 ms-2">
                                <select onChange={(e) => change(e.target.value)} id="inputState" className="select">
                                    <option value="">Select</option>
                                    <option className='text-white' value="cpp">C++</option>
                                    <option className='text-white' value="java">Java</option>
                                    <option className='text-white' value="py">Python</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={handleRun} className="btn btn-secondary me-4 lightGreen border-0">
                                    Run
                                </button>
                                <button onClick={handleSubmit} className="btn btn-secondary me-4 lightgreen border-0">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className="code black d-flex flex-column justify-content-between align-items-between ">

                            <textarea
                                placeholder="Enter your code here"
                                onChange={(e) => {
                                    setCode(e.target.value);
                                }}
                                value={code}
                                style={{
                                    fontStyle: "normal",
                                    spellcheck: "false",
                                    textDecoration: "none",
                                    height: 'calc(80vh - 200px)',
                                    width: '100%',
                                    fontFamily: 'Courier New, monospace',
                                    fontSize: '20px',
                                    padding: '10px',
                                    borderRadius: '5px',

                                    border: '1px solid #ccc',
                                    resize: 'vertical',
                                    backgroundColor: '#1e1e1e',
                                    color: '#dcdcdc',
                                }}
                            />
                            <NavLink className="submilink" to={`/submission/${params.uniquename}`}>
                                Go to all Submissions
                            </NavLink>
                            {
                                main ?
                                    <>
                                        {
                                            result ?
                                                <>
                                                    {
                                                        accepted ?
                                                            <div className='d-flex flex-column justify-content-center align-items-center p-3 result grey rounded overflow-hidden'>
                                                                <i className="fa-regular fa-square-check fs-1 green mb-1" />
                                                                <h5 className="green">Accepted</h5>
                                                            </div> :
                                                            <div className='d-flex flex-column justify-content-center align-items-center p-3 result grey rounded overflow-hidden'>
                                                                <i className="fa-regular fa-square-check fs-1 green mb-1" />
                                                                <h6 className="text-danger">Wrong Answer</h6>

                                                            </div>
                                                    }

                                                </> :

                                                <>
                                                    <div className="p-3 result grey rounded overflow-hidden">
                                                        <div className="row"></div>
                                                        {codeout ? <>
                                                            <div>
                                                                <p className="yout">For Input</p>
                                                                <pre>{userInput}</pre>
                                                                <p className="yout">Your Output</p>
                                                                <pre>{codeout}</pre>
                                                            </div>
                                                        </> :
                                                            <div className="d-flex flex-column justify-content-center align-items-center p-3 result grey rounded overflow-hidden"> <ClockLoader
                                                                color="#f6fef9"
                                                                size={70}
                                                                speedMultiplier={1}
                                                            />
                                                            </div>
                                                        }
                                                    </div>
                                                </>
                                        }
                                    </> :
                                    <>
                                        <div className="p-3 result grey rounded overflow-hidden">
                                            <div className="row">
                                                <div className="mb-3">
                                                    <div>
                                                        <label htmlFor="formGroupExampleInput" className="form-label">
                                                            Input
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setUserInput(e.target.value);
                                                            }}
                                                            value={userInput}
                                                            type="text"
                                                            className="form-control grey2 border-0 text-black"
                                                            id="formGroupExampleInput"
                                                            disabled=""
                                                        />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Workspace;
