const express = require('express');
const app = express();
require('./db/config');
const User = require('./db/model/User');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { create_question, question_all, GetOne } = require('./controllers/Questions')
const Submission = require('./db/model/Submission');
const TestModel = require('./db/TestModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


app.post('/register', async (req, res) => {
  const { username, email, password, cpassword, userid } = req.body;
  if (!username || !email || !password || !cpassword || !userid) {
    res.status(422).json({ error: "Please fill all the required fields" });
  }

  try {
    const userEmail = await User.findOne({ email: email });
    const Usersid = await User.findOne({ userid: userid });
    if (userEmail) {
      return res.status(409).json({ error: "Email already Exists" });
    } else if (Usersid) {
      return res.status(406).json({ error: "This UserID is not available" });
    } else if (password != cpassword) {
      return res.status(400).json({ error: "Passwords are not matching" });
    }
    else {
      const userD = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, salt),
        userid,
      })
      res.status(201).json(userD)
    }
  }
  catch (err) {
    console.log(err)
  }
  console.log("Success")
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json("Missing some of the fields");
  }
  try {
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email, id: userDoc.userid }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: userDoc.userid,
          email,
          token: token
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  }
  catch (err) {
    console.log(err);
  }

});
app.post("/submit", async (req, res) => {
  let user = new TestModel(req.body);
  await user.save();
  res.send("Success")
})
app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const output = await executeCpp(language, filePath, input);

    res.json({ filePath, output });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.post("/questions", create_question) // Create 
app.get("/questions", question_all) // GetAll
app.get("/questions/:id", GetOne)


app.post("/addsubmission", async (req, res) => {
  const { questionname, lang, code, verdict, userid } = req.body;

  if (!code) {
    return res.status(422).json({ error: "Write some code" });
  }

  try {
    const submission = {
      lang,
      code,
      userid,
      verdict,
    };

    const existingSubmission = await Submission.findOne({ questionname });
    if (existingSubmission) {
      existingSubmission.submissions.push(submission);
      await existingSubmission.save();
    } else {
      const newSubmission = new Submission({
        questionname,
        submissions: [submission],
      });
      await newSubmission.save();
    }

    res.status(201).json({ message: "Code Submitted Successfully" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/submissions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const submission = await Submission.findOne({ questionname: id });

    res.send(submission);
  } catch (error) {
    console.error(error);
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});