const express = require('express');
const user = require('../models/user')
const router = new express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");

const forgotPassword = express();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'techumbeo@gmail.com',
      pass: 'techumbeo123'
    }
  });

router.post('/forgotpassword' , async(req , res)=>{
    const email = await req.body.email;
    const User = await user.findOne({email});
    if(!User){
        res.status(404).send("No user found");
    }
    res.send(User);
    // const userId = User._id;
    // console.log(userId)
    const token = await jwt.sign({_id:User._id}, config.passwordSecretCode , {expiresIn:'5m'})
    const data = transporter.sendMail({
        from: "techumbeo@gmail.com",
        to: email,
        subject: "Change Password",
        html: `Use this link to update your password: <a href=https://jobhuntingapp.herokuapp.com/changepassword/${token}>Click here</a>`
    });
    transporter.sendMail(data, function(error, info){
      // console.log(info);
    });
})

router.patch('/changepassword/:token' , async (req , res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const token = req.params.token;
        const decode = jwt.verify(token , config.passwordSecretCode);
        const id = decode._id;
        // console.log(id);
        const User = await user.findById({_id:id})
        // console.log(User)
        User.password = req.body.password;
        User.save().then(()=>{
            res.send(User);
        })
    }
    catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;