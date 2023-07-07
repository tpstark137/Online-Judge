import axios from "axios"

const compile =  async (data)=>{

  try {
    const res = await axios
      .post("http://localhost:3000/code",data)
      console.log(res.data)
    return (res.data)
  } catch(err) {
          console.log("error" , err)
    return err
  }


}
export  {compile} 