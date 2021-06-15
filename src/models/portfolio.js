const mongoose = require('mongoose');
// const validator = require('validate.js');

const portfolioSchema = new mongoose.Schema({
    name:{
        type:String,
        // unique:true,
        required:true
    },
    email:{
        type:String,    
        required:true,
        // unique: [true, "Email is already present"],
        validate(value){
            if(!validator.isEmail()){
                throw new Error("Invalid email address")
            }
        }
    },
    phone:{
        type: Number,
        min: 10,
        max: 10,
        required: true
    },
    education:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:false
    },
    // resume:{
    //     type: String,
    //     required: true,
    // },
    skillset:{
        type: String,
        required: true,
    },
    projects:{
        type: String,
        required: true,
    },
    discription:{
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        unique: true,
        required: false,
    }
})

const Portfolio = new mongoose.model('Portfolio' , portfolioSchema);
module.exports = Portfolio;