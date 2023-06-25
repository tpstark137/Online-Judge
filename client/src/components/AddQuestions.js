import React from "react";
import { Editor } from "react-draft-wysiwyg";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestions = () => {
    const handleClick = () => {
    
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
        <div>
            <div className="" style={{ backgroundColor: '#E3E4E4', color: "black" }} >
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
                <div className="d-flex flex-column py-3 align-items-center">
                    <div className="d-flex flex-column ml-3 w-50">
                        <div className="d-flex flex-column align-items-center flex-lg-row  m-auto">
                            <h2>Create New Question</h2>
                        </div>
                        <hr />
                        <div className="mb-3 col-lg-6">
                            <input

                                type="text"
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="Sequence"
                            />

                        </div>

                        <input

                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Title"
                        />

                        <Editor
                            toolbarClassName="toolbarClassName bg-white mt-2"
                            wrapperClassName="bg-white demo-wrapper mt-2"
                            editorClassName="demo-editor mt-2 mb-2"
                            placeholder="Add Question Description "


                        />
                        <hr className="mt-5" />

                        Difficulty
                        <select class="form-select mt-2" aria-label="Default select example">
                            <option selected value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>


                    </div>

                    <button onClick={handleClick} class="btn btn-primary px-4 me-2 mt-5 mb-5">Sumbit</button>







                </div>
            </div>

        </div>

    )


}

export default AddQuestions;