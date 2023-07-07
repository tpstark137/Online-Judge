import React, { useState,useEffect } from 'react'

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
//import AceEditor from 'react-ace';

import './style.css'
//import "../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow"
import { getSubmission } from '../api/getSubmission';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const user = JSON.parse(localStorage.getItem("user"));
const Submission = (question) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({})

    const handleOpen = (item) => {
        setItem(item)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [submissions, setSubmitions] = useState([])
    useEffect(() => {

        const data = {
            token: user.name,
            q: question.question
        }

        getSubmission(data).then((data) => {
            console.log(data)
            setSubmitions(data)
        }).catch((err) => {
            console.log(err)
        })


    })

    return (
        <div className='overflow-auto'>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>

                    <div className="d-flex overflow-auto mb-3 justify-content-between border-bottom border-secondary">
                        <div>
                            {item.status === "pass" ?
                                <h6 className="text-success m-0 green">Accepted</h6>
                                :
                                <h6 className="text-danger m-0">Wrong Answer</h6>
                            }
                            <p className="text-secondary">{new Date(item.timesubmitted).toLocaleString()}</p>
                        </div>
                        <h6 className="text-primary ms-5 ps-5">{item.language}</h6>
                        <h6 className="text-dark ms-5 ps-5">{item.runtime / 100 + "s"}</h6>

                    </div>
                    <i onClick={() => { navigator.clipboard.writeText(item.solution) }} class="fas fa-copy"></i>
                    <div className="border">

                        <textarea
                            value={item.solution}
                            style={{
                                height: 'calc(80vh - 200px)',
                                width: '100%',
                                fontFamily: 'Courier New, monospace',
                                fontSize: '20px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                resize: 'vertical',
                                backgroundColor: '#1e1e1e', // Set the background color
                                color: '#dcdcdc', // Set the text color
                            }}
                        />

                    </div>
                    <button className='btn btn-secondary me-4 lightgreen border-0 mt-2' onClick={() => handleClose()}>Close</button>

                </Box>
            </Modal>
            <div className="overflow-auto">
                {submissions.map((item) =>
                    <>

                        <div onClick={() => handleOpen(item)} className="d-flex justify-content-between mb-3 mt-1  border-bottom border-secondary hvr-bob hvr-shadow box">
                            <div>
                                {item.status === "pass" ?
                                    <h6 className="text-success m-0 green">Accepted</h6>
                                    :
                                    <h6 className="text-danger m-0">Wrong Answer</h6>
                                }
                                <p className="text-secondary">{new Date(item.timesubmitted).toLocaleString()}</p>
                            </div>
                            <h6 className="text-primary ms-5 ps-5">{item.language}</h6>
                            <h6 className="text-white ms-5 ps-5">{item.runtime / 100 + "S"}</h6>
                        </div>
                    </>
                )}




            </div>
        </div>
    );
}


export default Submission



