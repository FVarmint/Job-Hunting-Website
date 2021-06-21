const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/userDB'
const user = require('../models/user')
const router = new express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");

//  const mailgun = require('mailgun-js');
//  const DOMAIN = "sandboxab158520fb3a41c1a6ab9c1d549b4eb1.mailgun.org";
//  const mg = mailgun({apiKey: "f8957e177df300dd198267addbd20953-90ac0eb7-998a5e8e", domain: DOMAIN});

const register = express();

mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
const con = mongoose.connection;

con.on('open' , ()=>{
    console.log('Database connected')
})
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'techumbeo@gmail.com',
    pass: 'techumbeo123'
  }
});

router.post('/register' , async (req,res)=>{
    try{
        // console.log(req.body.username);
        // console.log(req.body.email);
        // console.log(req.body.password);
        const token = await jwt.sign({email: req.body.email}, config.secret)
        // console.log(token)
        const registerUser = await new user({
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            confirmationCode: token
          });
        const email = await req.body.email;
       
        registerUser.save().then(()=>{
            // console.log(registerUser);
            res.send(registerUser);
            // const _id = registerUser._id;
            // console.log(_id);
            const confirmationCode = registerUser.confirmationCode;
            // console.log(confirmationCode)
            // const verificationLink = `http://localhost:3000/users/${_id}`
            const data = transporter.sendMail({
              from: "techumbeo@gmail.com",
              to: email,
              subject: "Umbeo Technologies",
              html: `Use this link to verify your email: <a href=http://localhost:3000/register/${confirmationCode}>Click here</a>`
          });
          transporter.sendMail(data, function(error, info){
            console.log(info);
          });
      }).catch((e)=>{
          res.status(400).send(e);
      })
  }
  catch(error){
      res.status(400).send(error);
  }
})

router.get('/register' , (req,res)=>{
    user.find({}).then((user)=>{
        // console.log(user);
        res.send(user);
    })
})

router.get('/register/:confirmationCode' , (req , res)=>{
    const User = user.findOne({
        confirmationCode: req.params.confirmationCode,
      })
        .then((User) => {
          if (!User) {
            return res.status(404).send({ message: "User Not found/the link has been deactivated" });
          }
    
          User.status = "Active";
          User.confirmationCode = null;
          res.send("Verified successfully");

          User.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
        })
        .catch((e) => console.log("error", e));
})

module.exports = router
