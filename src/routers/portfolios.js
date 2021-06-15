const express = require('express');
// require("../db/conn");
const router = new express.Router();
const Portfolio = require("../models/portfolio");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.post("/portfolio", (req, res) => {
    console.log(req.body);
    const user = new Portfolio(req.body);
   
    user.save().then(() => {
        res.send(user);
    }).catch((e) => {
        res.send(e);
    })

    //res.send("Hello");
})

router.patch('/portfolios/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email'] //, 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const User = await user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!User) {
            return res.status(404).send()
        }

        res.send(User)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/portfolios/delete/:id', async (req, res) => {
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
// app.listen(3000, () => {
//     console.log("server started at port 3000");
// })