import axios from "axios"


const getQuestions = async (lang)=>{
  try {

    const res = await axios
      .get("http://localhost:3000/questions/")
    return (res.data)
  } catch(err) {
    return err
  }


}
export  {getQuestions} 