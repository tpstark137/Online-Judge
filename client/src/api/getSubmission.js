import axios from "axios"
const getSubmission =  async (data)=>{

  try {
    const res = await axios
      .get("http://localhost:5000/submition/"+data.q)
      console.log(res)
    return (res.data)
  } catch(err) {
          console.log(err)

    return err
  }


}
export {getSubmission} 