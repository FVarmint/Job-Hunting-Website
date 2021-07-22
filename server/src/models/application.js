const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const job = require('./job')
const portfolio = require('./portfolio')

const applicationSchema = new mongoose.Schema({
    
    jobID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'job'
    },
    portfolioID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'portfolio'

    }
},
{timestamps:true}
);

const application = new mongoose.model('application' , applicationSchema);
module.exports = application;