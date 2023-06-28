import React,{useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const AddQuestions = () => {
    const [Sequence,setSequence] = useState()
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [uniqueName , setUnique]  = useState("")
    const [data , setData ]= useState(EditorState.createEmpty())
    const [difficulty , setDif] = useState("Easy")

    const onEditorStateChange=(editorState) => {
        setData(editorState)
         setDesc(draftToHtml(convertToRaw(data.getCurrentContent())))
      };

      const HandelTitile = (e)=>{
        const t = e.target.value;
        setTitle(t);
        let un = ""
        for(let i =0 ;i < t.length ; i++)
        {
          if(t[i]===' ')
          {
            un+='-'
          }
          else
          un+=t[i].toLowerCase()
        }
  
        setUnique(un)
    }

    const nav = useNavigate();
    const handleClick = async ()=>{

        const data = {
          uniquename:uniqueName,
          sequence: Sequence,
          title: title,
          description: description,
          difficulty: difficulty
        }
      await axios.post('http://localhost:3000/questions',data).then((D)=>{
      toast.success('Add Success', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      nav('/')
      }).catch((D)=>{
      toast.error(D.response.data.errors, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
        })
      
      }
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
                                value={Sequence} onChange={(e) => setSequence(e.target.value)}
                                type="text"
                                className="form-control"
                                id="formGroupExampleInput"
                                placeholder="Sequence"
                            />

                        </div>

                        <input
                            value={title} onChange={(e) => HandelTitile(e)}
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Title"
                        />
                        <input
                            value={uniqueName}
                            type="text"
                            className="form-control mt-2 "
                            id="formGroupExampleInput"
                            disabled
                        />

                        <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="bg-white demo-wrapper mt-2"
                            editorClassName="demo-editor"
                            editorState={data}
                            onEditorStateChange={onEditorStateChange}
                        />
                        <hr className="mt-5" />

                        Difficulty
                        <select onChange={(e) => setDif(e.target.value)} class="form-select mt-2" aria-label="Default select example">
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