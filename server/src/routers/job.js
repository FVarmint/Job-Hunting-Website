const job = require('../models/job');
const user = require('../models/user');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/jobDB'
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// const job = express();
// mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
// const con = mongoose.connection;

// con.on('open' , ()=>{
//     console.log('jobDB connected')
// })

router.post('/users/jobs' , auth ,  async(req,res)=>{
    try{
        const user = req.User._id;
        const registerJob = await new job({
            companyName: req.body.companyName,
            profile: req.body.profile,
            jobDescription: req.body.jobDescription,
            experience: req.body.experience,
            jobDetails: req.body.jobDetails,
            jobLocation: req.body.jobLocation,
            userID: user,
        })
        registerJob.save().then(()=>{
            // console.log(registerJob);
            res.send(registerJob)
        })
    }
   
    catch(error){
        res.status(400).send(error);
    }
})
// router.delete('/jobs/delete/:id', async (req, res) => {
//     try {
//         const Job = await user.findByIdAndDelete(req.params.id);

//         if (!Job) {
//             return res.status(404).send();
//         }

//         res.send(Job);
//     } catch (e) {
//         res.status(500).send();
//     }
// })

router.get('/jobs/:id' ,auth ,  async(req,res)=>{
    const _id = req.params.id;

    job.findById(_id).then((job)=>{
        res.send(job);
    })


})

router.get('/displayjobs' , (req , res)=>{
    // console.log("working")
    job.find({}).then((jobs)=>{
        res.status(200).send(jobs);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

router.post('/jobsbyuser' , auth, async(req,res)=>{
    //const User._id = req.params.id;
    const user = req.User._id;
    job.find({userID:user}).then((job)=>{
        res.send(job);
    })
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
