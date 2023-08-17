import React, { useState } from "react";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import 'react-quill/dist/quill.snow.css';


const AddQuestion = () => {

    const [Sequence, setSequence] = useState()
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [uniqueName, setUnique] = useState("")
    const [difficulty, setDif] = useState("Easy")
    const [tags, setTags] = useState("")
    const [constraints, setConstraints] = useState("")
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    const onChange = (value) => {
        setDesc(value)
    }
    const HandelTitile = (e) => {
        const t = e.target.value;
        setTitle(t);
        let un = ""
        for (let i = 0; i < t.length; i++) {
            if (t[i] === ' ') {
                un += '-'
            }
            else
                un += t[i].toLowerCase()
        }

        setUnique(un)
    }
    const nav = useNavigate()
    const handleClick = async () => {

        const data = {
            sequence: Sequence,
            title: title,
            description: description,
            uniquename: uniqueName,
            difficulty: difficulty,
            tag: tags,
            constraints: constraints,
            input: input,
            output: output
        }
        await axios.post('http://localhost:5000/questions', data).then((D) => {
            nav('/')
        }).catch((D) => {
            console.log(D)
        });

    }
    return (
        <div>
            <div className="" style={{ backgroundColor: '#E3E4E4', color: "black" }} >
                <div className="d-flex flex-column py-3 align-items-center">
                    <div className="d-flex flex-column ml-3 w-50">
                        <div className="d-flex flex-column align-items-center flex-lg-row align-items-lg-start m-auto">
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
                        <input
                            value={tags} onChange={(e) => setTags(e.target.value)}
                            type="text"
                            className="form-control mt-2 "
                            id="formGroupExampleInput"
                            placeholder="Tags"
                        />
                        <input
                            value={constraints} onChange={(e) => setConstraints(e.target.value)}
                            type="text"
                            className="form-control mt-2 "
                            id="formGroupExampleInput"
                            placeholder="Constraints"
                        />
                        <input
                            value={input} onChange={(e) => setInput(e.target.value)}
                            type="text"
                            className="form-control mt-2 "
                            id="formGroupExampleInput"
                            placeholder="Input"
                        />
                        <input
                            value={output} onChange={(e) => setOutput(e.target.value)}
                            type="text"
                            className="form-control mt-2 "
                            id="formGroupExampleInput"
                            placeholder="Output"
                        />
                        <div className="mb-3 mt-3 bg-white ">
                            <Editor
                                value={description}
                                onChange={onChange}
                            />
                        </div>

                        Difficulty
                        <select onChange={(e) => setDif(e.target.value)} className="form-select" aria-label="Default select example">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                    </div>

                    <button onClick={handleClick} className="btn btn-primary px-4 me-2 mb-5">Sumbit</button>
                </div>
            </div>

        </div>

    )
}

export default AddQuestion