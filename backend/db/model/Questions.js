var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  uniquename: { type: String, required: true, unique: true, max: 100 }, // auto generated based on title
  sequence: { type: Number, required: true },
  title: { type: String, required: true, max: 50 },
  description: { type: String, required: true },
  difficulty: { type: String},
  input:{type:String,required:true},
  output:{type:String,required:true},
  constraints:{type:String},
  tag:{type:String,required:true},
});


module.exports = mongoose.model("questions", QuestionSchema);