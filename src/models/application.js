const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const job = require('./job')
const portfolio = require('./portfolio')

const applicationSchema = new mongoose.Schema({
    
    date:{
        type:String,
        unique:false,
        required:true
    }
    ,
    jobID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'job'
    },
    portfolioID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'portfolio'
    }
})

const application = new mongoose.model('application' , applicationSchema);
module.exports = application;
