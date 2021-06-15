const express = require('express');
const path = require('path');
const registerRouter = require("./routers/register");
const loginRouter = require('./routers/login');
const usersRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.port || 3000;

const viewsPath = path.join(__dirname , '../templates');

app.use(express.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use('/admin' , adminRouter)
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

app.use(express.static(viewsPath));

app.get('/' , (req,res)=>{
    res.render("index");
})
app.post('/jobs' , async(req,res)=>{
    try{
        const registerJob = await new job({
            companyName: req.body.companyName,
            profile: req.body.profile,
            jobDescription: req.body.jobDescription,
            experience: req.body.experience,
            jobDetails: req.body.jobDetails,
            jobLocation: req.body.jobLocation,
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
app.patch('/jobs/update/:id', async (req, res) => {
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

app.listen(port , ()=>{
    console.log('Site is up on port ' + port);
})