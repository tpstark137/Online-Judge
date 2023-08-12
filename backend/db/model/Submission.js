var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Submission = new Schema({
    questionname: { type: String, required: true, max: 100 },
    submissions: [
      {
        lang: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        verdict: {
          type: String,
          required: true,
        },
        userid: {
          type: String,
          required: true,
        },
        timestamps: {
          type: Date,
          default: Date.now,
        },
      },
    ],
});


module.exports = mongoose.model("submissions", Submission);