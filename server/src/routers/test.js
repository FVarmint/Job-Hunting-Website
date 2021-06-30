const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const url = 'mongodb://localhost/userDB'
const user = require('../models/user')
const router = new express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

const test = express();

router.get('/test' , async (req,res)=>{
    try{
        console.log("Testing");
        res.send("Testing");
    }
    catch(e){
        res.status(400).send(e);
    }
    
})

module.exports = router;