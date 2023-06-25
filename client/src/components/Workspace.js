import React,{useState} from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import './style.css';
//import AceEditor from 'react-ace';
//import "../../node_modules/ace-builds/src-min-noconflict/theme-twilight";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Workspace() {
  const [code, setCode] = React.useState("");
  const [output, setOutput] = useState("Output will be displayed here");
  
  const handleClick = async() => {
    console.log(code);
    const payload = {
      language: 'cpp',
      code
    };

    try {
      const { data } = await axios.post('http://localhost:3000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }

    toast.success('Submitted Successfully 🎉🍾', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div>
        <div className="border coding overflow-auto grey rounded-bottom">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />

          <div className="d-flex justify-content-between py-2">
            <div className="col-md-3 ms-2">
              <select id="inputState" className="form-select a form-select grey border-secondary text-white">

                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="c++">C++</option>
                <option value="java">Javascript</option>
              </select>
            </div>
            <div>
              <button className="btn btn-secondary me-4 lightgreen border-0" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>

          <div>
          <textarea
          placeholder="Enter your code here"
          onChange={(e) => {
            setCode(e.target.value);
          }}
          value={code}
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
          {
           output && 
          <div className="d-flex flex-column justify-content-center align-items-center p-3 result grey rounded overflow-hidden mt-3">
            <p>{output}</p>
          </div>
          }
        </div>
      </div>
    </Split>
  );
}

export default Workspace;
