const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const User = require('./models/User');

const app = express();
const Port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/registration");


app.use(express.static(path.join(__dirname,'Public')));


app.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    try{
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.send('Registration Successfull');
    }
    catch (err) {
        res.status(500).send('ERROR PLEASE TRY AGAIN LATER');
    }
});


app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email, password});
        if (user) {
            res.redirect('/loginsuccess');
        }
        else{
            res.status(401).send('Login Failed: Inavalid credentials ');

        }
    } catch (err){
       console.log(err); 
    }
});

app.get('/loginsuccess', (req, res)=>{
    res.send('<h1>Login Successfull</h1>');
})

app.listen(Port,()=>{
    console.log(`Server is running on http://localhost:${Port}`);
});