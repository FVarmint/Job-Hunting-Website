const portfolio = require('../models/portfolio');
const user = require('../models/user');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/portfolios'
const mongoose = require('mongoose');
const auth = require('../middleware/auth'); 
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

// const portfolio = express();
// mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
// const con = mongoose.connection;

// con.on('open' , ()=>{
//     console.log('portfolioDB connected')
// })

router.post('/users/portfolios' , auth, [
    check('email', 'not a valid email address')
        .isEmail()
        .normalizeEmail(),

    check('phone', 'Please enter a valid phone number')
        .isMobilePhone(),

    // check('linkedinProfile', 'Not a valid URL')
    //     .isURL(),

    // check('workSampleProfile', 'Not a valid URL')
    //     .isURL(),
], async(req,res)=>{
    try{
        const user = req.User._id;
        const registerportfolio = await new portfolio({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            education: req.body.education,
            profile: req.body.profile,
            // resume: req.body.resume,
            skillset: req.body.skillset,
            projects: req.body.projects,
            projectDiscription: req.body.projectDiscription,
            linkedinProfile: req.body.linkedinProfile,
            workSampleLink: req.body.workSampleLink,
            userID: user,
        })
        registerportfolio.save().then(()=>{
            // console.log(registerportfolio);
            res.send(registerportfolio)
        })
    }
   
    catch(error){
        res.status(400).send(error);
    }
})
router.patch('/portfolios/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'phone', 'address', 'education', 'profile', 'skillset' , 'projects', 'projectDiscription' , 'linkedinProfile','workSampleLink']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const portfolio = await portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!portfolio) {
            return res.status(404).send()
        }

        res.send(portfolio)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/portfolios/:id', (req,res,next)=>{
    console.log(req.params.id);
    portfolio.findById(req.params.id).then(result =>{
        res.status(200).json({
            portfolio:result
        })
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.get('/displayportfolios' , (req , res)=>{
    portfolio.find({}).then((portfolios)=>{
        res.status(200).send(portfolios)
    }).catch((e)=>{
        res.status(400).send(e);
    })
}) 

router.get('/portfoliosbyuser' , auth, async(req,res)=>{
    //const User._id = req.params.id;
    const user = req.User._id;
    portfolio.find({userID:user}).then((portfolio)=>{
        res.send(portfolio);
    })
})

module.exports = router
