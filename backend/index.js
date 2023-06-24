const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result=result.toObject();
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});