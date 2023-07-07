const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    input:{
        type: String,
        required: true
    },
    output:{
        type: String,
        required: true
    }
})

const TestModel=mongoose.model("testmodels",TestSchema);
module.exports = TestModel;