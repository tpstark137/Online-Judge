const mongoose =require('mongoose')

const QuestionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    explanation:{
        type: String,

    },
    constraints: {
        type: String,
        required: true
    }
    
})
module.exports = mongoose.model('questions', QuestionSchema)
