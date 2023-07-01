const express = require('express');
const app = express();

require('./db/config');
const User = require('./db/User');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const {create_question,question_all,GetOne} = require('./controllers/Questions')
const {submission_run , getSubmitionAll} = require('./controllers/Submition')
const cors  = require('cors');

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
    console.log("User Registered Successfully")

});
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {

        let user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
            console.log("User Logged in Successfully")
        }
        else {
            res.status(401).send({ message: "No User Found" });
        }

    }
    else {
        res.status(401).send({ message: "No User Found" });
    }


});
app.post("/run", async (req, res) => {
    // const language = req.body.language;
    // const code = req.body.code;

    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }

    // let submission = new Submission(req.body);
    // let result = await submission.save();
    // res.send(result);
});

// app.post("/questions", async (req, res) => {
//     let question=new Questions(req.body);
//     let result=await question.save();
//     res.send(result);
// });
app.post("/questions",create_question) // Create 
app.get("/questions",question_all) // GetAll
app.get("/questions/:id",GetOne) 
app.post("/submition",submission_run);
app.get('/submition/:filter',getSubmitionAll )

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});