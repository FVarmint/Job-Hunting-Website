const express = require('express');
const user = require('../models/user')
const router = new express.Router();
const auth = require("../middleware/auth");
const login = require('./login');

const users = express();

// router.post('/users' , async (req, res) => {
//     const user = new user(req.body)

//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({user , token})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.get('/users' , async(req , res)=>{
    user.find({}).then((users)=>{
        // console.log(users);
        res.status(200).send(users);
    }).catch((e)=>{
        res.status(400).send(e);
    })

})

router.get('/users/me' , auth , async(req , res)=>{
    // console.log(req.User);
    res.send(req.User)
})

router.get('/users/:id' , (req,res)=>{
    const _id = req.params.id;

    user.findById(_id).then((user)=>{
        res.send(user);
    })
})

router.patch('/users/updateprofile', auth , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    const userID = req.User._id;
    // console.log(userID)

    try {
        const User = await user.findByIdAndUpdate(userID, req.body, { new: true, runValidators: true })
    
        if (!User) {
            return res.status(404).send()
        }

        res.send(User)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/delete/:id', async (req, res) => {
    try {
        const User = await user.findByIdAndDelete(req.params.id);

        if (!User) {
            return res.status(404).send();
        }

        res.send(User);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;