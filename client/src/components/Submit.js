import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import './style.css'


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

const Submit = () => {


    const params = useParams()
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({})
    const [submission, setSubmission] = useState();

    const handleOpen = (item) => {
        setItem(item)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const callSubmissions = async () => {
        try {
            let res = await fetch('http://localhost:3000/submissions/' + params.uniquename, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const submiData = await res.json();
            console.log(submiData.submissions);
            setSubmission(submiData.submissions);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        callSubmissions();
    }, [])

    return (
        <div className='overflow-auto m-3'>


                        <Modal
                            open={open}
                            onClose={handleClose}

                        >
                            <Box sx={style}>

                                <div className="d-flex overflow-auto mb-3 justify-content-between border-bottom border-secondary">
                                    <div>
                                        {item.verdict === "Accepted" ?
                                            <h6 className="text-success m-0 green">Accepted</h6>
                                            :
                                            <h6 className="text-danger m-0">Wrong Answer</h6>
                                        }
                                        <p className="text-secondary">{new Date(item.timestamps).toLocaleString()}</p>
                                    </div>
                                    <h6 className="text-primary ms-5 ps-5">{item.lang}</h6>

                                </div>
                                <i onClick={() => { navigator.clipboard.writeText(item.code) }} class="fas fa-copy"></i>
                                <div className="border">

                                    <textarea
                                        value={item.code}
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
                            {submission ? 
                            (
                              <table className="content-table">
                              <thead>
                                <tr>
                                  <th>UserID</th>
                                  <th>Language</th>
                                  <th>Verdict</th>
                                  <th>When</th>
                                </tr>
                              </thead>
                              <tbody>
                            
                            {submission.slice()
                                .reverse()
                                ?.map((item) => {
                                    return (

                                        <div className="d-flex justify-content-between mb-3 mt-1  border-bottom border-secondary hvr-bob hvr-shadow box">
                                            <div>
                                                {item.verdict === "Accepted" ?
                                                    <h6 className="text-success m-0 green">Accepted</h6>
                                                    :
                                                    <h6 className="text-danger m-0">Wrong Answer</h6>
                                                }
                                                <p className="text-secondary">Submitted By: {item.userid}</p>
                                                <p className="text-primary"> Language: {item.lang}</p>
                                                <p className="text-secondary">TimeStamp: {new Date(item.timestamps).toLocaleString()}</p>
                                            </div>
                                            <button className='btnView' onClick={() => handleOpen(item)}>{`</> View Code`}</button>
                                        </div>
                                    )
                                })} 
                                </tbody>
                                </table>
                            )
                                
                                
                                : (<h3>No Submission found</h3>

                            )}


                        </div>
                    </div>
    );
}


export default Submit;