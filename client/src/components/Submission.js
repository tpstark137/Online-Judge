import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const Submissions = () => {
  const params = useParams()

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({})
  const [submission, setSubmission] = useState();

  const callSubmissions = async () => {
    try {
      let res = await fetch('http://localhost:5000/submissions/' + params.uniquename, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      })

      const submiData = await res.json();
      setSubmission(submiData.submissions);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAgoTime = (timeStamp) => {
    const currentTime = Date.now();
    const givenTime = new Date(timeStamp).getTime();
    const timeDifference = currentTime - givenTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let agoMessage = "";

    if (days > 0) {
      agoMessage = `${days} day(s) ago`;
    } else if (hours > 0) {
      agoMessage = `${hours} hour(s) ago`;
    } else if (minutes > 0) {
      agoMessage = `${minutes} minute(s) ago`;
    } else {
      agoMessage = `${seconds} second(s) ago`;
    }

    return agoMessage;
  };

  useEffect(() => {
    callSubmissions();
  }, []);
  const handleOpen = (item) => {
    setItem(item)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  

  return (
    <>
      <section className="problemtable">
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
                spellCheck="false"
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

        {submission ? (
          <table className="content-table">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Language</th>
                <th>Verdict</th>
                <th>When</th>
                <th>{`</>Submission`}</th>
              </tr>
            </thead>
            <tbody>
              {submission.slice()
                .reverse()
                ?.map((i) => {
                  return (
                    <tr>
                      <td>{i.userid}</td>

                      {i.lang === "cpp" && <td>C++</td>}
                      {i.lang === "java" && <td>Java</td>}
                      {i.lang === "py" && <td>Python</td>}

                      {i.verdict ==="Wrong Answer" && (
                        <td
                          style={{
                            fontSize: "0.91em",
                            color: "#ff0f1e",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Wrong Answer
                        </td>
                      )}
                      {i.verdict === "Accepted" && (
                        <td
                          style={{
                            fontSize: "0.91em",
                            color: "#07ac07",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          Accepted
                        </td>
                      )}

                      <td>{calculateAgoTime(i.timestamps)}</td>
                      <td><button className="btn-primary" onClick={() => handleOpen(i)}>Show code</button></td>

                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text1">No Submission Found</p>
        )}
      </section>
    </>
  );
};

export default Submissions;
