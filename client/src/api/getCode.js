import axios from "axios"


const getcode = async (qN)=>{
  try {

    const res = await axios
      .get("http://localhost:3000/questions/"+qN)
    return (res.data)
  } catch(err) {
    return err
  }


}
export  {getcode} 