const portfolio = require('../models/portfolio');
const user = require('../models/user');
const express = require('express');
const router = new express.Router();
const url = 'mongodb://localhost/portfolios'
const mongoose = require('mongoose');
const auth = require('../middleware/auth'); 
const bodyParser = require('body-parser');

// const portfolio = express();
mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
const con = mongoose.connection;

con.on('open' , ()=>{
    console.log('portfolioDB connected')
})

router.post('/users/portfolios' , auth ,  async(req,res)=>{
    try{
        const user = req.User._id;
        const registerportfolio = await new portfolio({
            name: req.body.name,
            email: req.body.email,
            // portfolioDescription: req.body.portfolioDescription,
            // experience: req.body.experience,
            // portfolioDetails: req.body.portfolioDetails,
            // portfolioLocation: req.body.portfolioLocation,
            userID: user,
        })
        registerportfolio.save().then(()=>{
            console.log(registerportfolio);
            res.send(registerportfolio)
        })
    }
   
    catch(error){
        res.status(400).send(error);
    }
})
router.patch('/portfolios/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['companyName', 'portfolioDescription', 'profile', 'experience', 'portfolioDetails', 'portfolioLocation']
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

module.exports = router
