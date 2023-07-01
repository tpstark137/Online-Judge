const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
},
},
{timestamps:true}
);
module.exports=mongoose.model('users',userSchema);
