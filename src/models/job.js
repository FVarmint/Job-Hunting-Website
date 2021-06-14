const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
    companyName:{
        type:String,
        unique:false,
        required:true
    },
    profile:{
        type:String,
        unique:true,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:false
    },
    jobDetails:{
        type: String,
        unique: true,
    },
    jobLocation: {
        type: String, 
        required:false
      }
})

const job = new mongoose.model('job' , userSchema);
module.exports = job;
