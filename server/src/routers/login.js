const express = require('express');
const user = require('../models/user')
const router = new express.Router();
const auth = require("../middleware/auth");
const users = require('./users');

const login = express();

router.get('/users/login' , (req,res)=>{
    res.render('login');
    console.log("login test");
})

router.post('/users/login' , async (req , res)=>{
    try{
        const User = await user.findByCredentials(req.body.username , req.body.password);
        const token = await User.generateAuthToken();

        res.cookie("jwttoken" , token , {
          expires: new Date(Date.now() + 25892000000)
        })
        
        // console.log(req.body.username);
        if (User.status != "Active") {
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
          }
          else{
            // console.log(User);
            res.send({User , token});
          }
    }catch(e){
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
      req.User.tokens = req.User.tokens.filter((token) => {
          return token.token !== req.token;
      })
      await req.User.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;