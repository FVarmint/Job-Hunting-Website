const job = require('../models/job');
const user = require('../models/user');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/jobDB'
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// const job = express();
mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
const con = mongoose.connection;

con.on('open' , ()=>{
    console.log('jobDB connected')
})

router.post('/users/jobs' , auth ,  async(req,res)=>{
    try{
        const user = req.User;
        const registerJob = await new job({
            companyName: req.body.companyName,
            profile: req.body.profile,
            jobDescription: req.body.jobDescription,
            experience: req.body.experience,
            jobDetails: req.body.jobDetails,
            jobLocation: req.body.jobLocation,
            userDetails: user,
        })
        registerJob.save().then(()=>{
            console.log(registerJob);
            res.send(registerJob)
        })
    }
   
    catch(error){
        res.status(400).send(error);
    }
})
router.patch('/jobs/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['companyName', 'jobDescription', 'profile', 'experience', 'jobDetails', 'jobLocation']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const Job = await job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!Job) {
            return res.status(404).send()
        }

        res.send(Job)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router