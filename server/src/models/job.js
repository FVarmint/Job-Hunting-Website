const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const user = require('./user')

const jobSchema = new mongoose.Schema({
    
    companyName: {
        type: String,
        unique: false,
        required: true
    },
    profile: {
        type: String,
        unique: true,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: false
    },
    jobDetails: {
        type: String,
        unique: false,
    },
    jobFrom: {
        type: String,
        enum: ['work from home', 'in-office'],
    },
    jobLocation: {
        type: String
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
    },
    jobDuration: {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const job = new mongoose.model('job' , jobSchema);
module.exports = job;
