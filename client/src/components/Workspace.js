import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import './style.css';
//import AceEditor from 'react-ace';
//import "../../node_modules/ace-builds/src-min-noconflict/theme-twilight";
//import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
import { compile } from '../api/compiler';
// import ClockLoader from "react-spinners/ClockLoader";
import { getcode } from '../api/getCode';
import { useParams } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));

function Workspace() {
    const [code, setCode] = React.useState("");

    const [lang, setLang] = useState("");
    // const [mode, setMode] = useState("");
    // const [error, setError] = useState('')
    // const [main, setMain] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const [accepted, setAcceted] = useState(false)

    const [input, setInput] = useState('')
    const [output, setOut] = useState('')
    // const [expected, setExpected] = useState('');
    // const [int, setInt] = useState("")

    const [Q, setQ] = useState()
    const params = useParams()

    useEffect(() => {

        getcode(params.uniquename).then((data) => {
            setQ(data.Q)
        })

    })


    const change = (lan) => {
                setLang(lan)

        }

    const run = () => {
        const data = {
            username: user.id,
            uniquename: Q.uniquename,
            language: lang,
            code: code,
            input: input,
            type: "Submit"
        }
        compile(data).then((res) => {
            console.log(res)
            setOut(res.output)


        }).catch((err) => {
            console.log("H", err)
        }
        )
    }


    return (
        <Split className="split" minSize={0}>
            <ProblemDescription />
            <div className="col-5 grey solution rounded overflow-hidden mt-md-0 mt-2">
                <div className="d-flex justify-content-between py-2">
                    <div className="col-md-3 ms-2">
                        <select onChange={(e) => change(e.target.value)} id="inputState" className="form-select a form-select grey border-secondary text-white">
                            <option value="cpp" selected="" className="mb-3 ">
                                cpp
                            </option>
                            <option value="java">java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={run} className="btn btn-secondary me-4 lightGreen border-0">
                            Run
                        </button>
                        <button onClick={run} className="btn btn-secondary me-4 lightgreen border-0">
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
                   
                        <div className="p-3 result grey rounded overflow-hidden">
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Inputs
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setInput(e.target.value);
                                        }}
                                        value={input}
                                        type="text"
                                        className="form-control grey2 border-0 text-black"
                                        id="formGroupExampleInput"
                                        disabled=""
                                    />
                                </div>
                                <div className="mb-3 col">
                                    <label htmlFor="formGroupExampleInput2" className="form-label">
                                        Output
                                    </label>
                                    <textarea
                                        onChange={(e) => {
                                            setOut(e.target.value);
                                        }}
                                        className='text-black form-control grey2 border-0'
                                        value={output}
                                        type="text"
                                        />
                                </div>
                            </div>
                        </div>

              

                </div>
            </div>

        </Split>

    );
}

export default Workspace;
