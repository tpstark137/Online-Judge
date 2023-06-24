import React, { useState } from 'react'

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import AceEditor from 'react-ace';

import './style.css'
import "../../node_modules/ace-builds/src-min-noconflict/theme-tomorrow"

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
const Submission = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    return (
        <div className='overflow-auto'>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>

                    <div className="d-flex overflow-auto mb-3 justify-content-between border-bottom border-secondary">
                        <div>

                            <h6 className="text-success m-0 green">Accepted</h6>

                            <p className="text-secondary">50 minutes ago</p>
                        </div>
                        <h6 className="text-primary ms-5 ps-5">C++</h6>
                        <h6 className="text-dark ms-5 ps-5">1 second</h6>

                    </div>


                    <div className="border">
                        <AceEditor
                            placeholder="Placeholder Text"
                            mode="javascript"
                            disabled={true}
                            theme="tomorrow"
                            value='#include<bits/stdc++.h> 
                             using namespace std;
                             int main(){
                                cout<<"Hello World";
                                return 0;
                                }'
                            height={450}
                            width={"100%"}

                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}

                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 2,
                            }} />
                    </div>
                    <button className='btn btn-secondary me-4 lightgreen border-0 mt-2' onClick={() => handleClose()}>Close</button>

                </Box>
            </Modal>
            <div className="overflow-auto">
                <div className="d-flex justify-content-between mb-3 mt-1  border-bottom border-secondary hvr-bob hvr-shadow box">
                    <div>
                        <h6 className="text-success m-0 green">Accepted</h6>
                        <p className="text-secondary">45 Minutes ago</p>
                    </div>
                    <h6 className="text-primary ms-5 ps-5">C++</h6>
                    <h6 className="text-white ms-5 ps-5">1 second</h6>
                    <button className="btn btn-secondary me-4 lightgreen border-0" onClick={() => handleOpen()}>Show Code</button>
                </div>



            </div>
        </div>
    );
}


export default Submission



