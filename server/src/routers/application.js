const application = require('../models/application');
const job = require('../models/job');
const user = require('../models/portfolio');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/applicationDB'
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// const job = express();
// mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
// const con = mongoose.connection;

// con.on('open' , ()=>{
//     console.log('jobDB connected')
// })

router.post('/users/applications' , auth ,  async(req,res)=>{
    try{
        const user = req.User._id;
        const registerApplication = await new application({
            date: req.body.date,
            // jobID: job,
            // portfolioID: portfolio,
        })
        registerApplication.save().then(()=>{
            console.log(registerApplication);
            res.send(registerApplication)
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

// router.get('/jobs/:id' ,auth ,  async(req,res)=>{
//     const _id = req.params.id;

//     job.findById(_id).then((job)=>{
//         res.send(job);
//     })


// })

// router.post('/jobsbyuser' , auth, async(req,res)=>{
//     //const User._id = req.params.id;
//     const user = req.User._id;
//     job.find({userID:user}).then((job)=>{
//         res.send(job);
//     })
// })
// router.patch('/jobs/update/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['companyName', 'jobDescription', 'profile', 'experience', 'jobDetails', 'jobLocation']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const Job = await job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
//         if (!Job) {
//             return res.status(404).send()
//         }

//         res.send(Job)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

module.exports = router
