const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const url = 'mongodb://localhost/userDB'
=======
const url = 'mongodb+srv://adminUmbeo:adminpassword@cluster0.8gwk3.mongodb.net/userDB?retryWrites=true&w=majority'
>>>>>>> ed3572b77162447065e5ee4b68ddd45fdac41a65
const user = require('../models/user')
const router = new express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");

<<<<<<< HEAD
//  const mailgun = require('mailgun-js');
//  const DOMAIN = "sandboxab158520fb3a41c1a6ab9c1d549b4eb1.mailgun.org";
//  const mg = mailgun({apiKey: "f8957e177df300dd198267addbd20953-90ac0eb7-998a5e8e", domain: DOMAIN});
=======
const mailgun = require('mailgun-js');
const DOMAIN = "sandboxa7c206cf460c43e08db1e5d032d67168.mailgun.org";
const mg = mailgun({apiKey: "33d8533b7b4c5fd6450d1f38f5b5e913-90ac0eb7-6d7d70f0", domain: DOMAIN});
>>>>>>> ed3572b77162447065e5ee4b68ddd45fdac41a65

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
<<<<<<< HEAD
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
=======
            const data = {
                from: "noreply@hello.com",
                to: email,
                subject: "Umbeo Technologies",
                html: `Use this link to verify your email: <a href="http://localhost:3000/register/${confirmationCode}">http://localhost:3000/register/${confirmationCode}</a>`,
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
        }).catch((e)=>{
            res.status(400).send(e);
        })
    }
    catch(error){
        res.status(400).send(error);
    }
>>>>>>> ed3572b77162447065e5ee4b68ddd45fdac41a65
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
