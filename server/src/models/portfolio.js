const mongoose = require('mongoose');
// const validator = require('validate.js');
const bcrypt = require('bcrypt'); 
const user = require('./user')

const portfolioSchema = new mongoose.Schema({ 
    name:{
        type:String,
        // unique:true,
        required:true
    }, 
    email:{
        type:String,    
        required:true
    },
    address: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: false
    },
    // resume:{
    //     type: String,
    //     required: true,
    // },
    skillset: {
        type: String,
        required: true
    },
    projects: {
        type: String,
        required: true
    },
    projectDiscription: {
        type: String,
        required: true
    },
    linkedinProfile: {
        type: String,
        required: false,
    },
    workSampleLink: {
        type: String,
        required: false,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
})

const portfolio = new mongoose.model('portfolio' , portfolioSchema);
module.exports = portfolio;
