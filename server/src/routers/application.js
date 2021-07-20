const application = require('../models/application');
const job = require('../models/job');
const user = require('../models/portfolio');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/applicationDB'
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const portfolio = require('../models/portfolio');

router.post('/applyforjob/:jobid/:portfolioid' , auth , async(req , res)=>{
    try{
    const applyForJob = await new application({
        jobID: req.params.jobid,
        portfolioID: req.params.portfolioid
    })
    applyForJob.save().then(()=>{
        // console.log(applyForJob);
        res.send(applyForJob);
        }).catch((e)=>{
            res.status(400).send(e);
        })
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.get('/applicationsbyjob/:jobid' , auth , async(req , res)=>{
    // const jobID = req.params.jobid;
    try{
    application.find({jobID: req.params.jobid}).then((application)=>{
        res.status(200).send(application);
    }).catch((e)=>{
        res.status(400).send(e);
    })
}
catch(e){
    res.status(400).send(e);
}
})

router.get('/applicationdetails/:applicationid' , auth, async(req , res)=>{
    const Application = await application.findById(req.params.applicationid);
    portfolio.findById(Application.portfolioID).then((portfolio)=>{
        res.status(200).send(portfolio);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

module.exports = router
