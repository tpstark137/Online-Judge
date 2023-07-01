
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Submission = new Schema({
    username: { 
        type: Schema.Types.ObjectId,
        ref: 'users' 
      },
    questionname: { type: String, required: true, max: 100 },
    language: {
            type: String,
            enum: ["java", "c", "c++","python"],
            default: "javascript"
          },
    code: { type: String, required: true },
    output: { type: String},
    status: {
        type: String,
        enum: ["initial", "pass", "fail"],
        default: "initial"
      },
      timeupdated: { type: Date, default: Date.now },
      timesubmitted: { type: Date },
      runtime: { type: Number, default: 0 }
});


module.exports = mongoose.model("submissions", Submission);