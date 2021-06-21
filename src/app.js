const express = require('express');
const path = require('path');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const usersRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
const bodyParser = require('body-parser');
const portfolioRouter = require('./routers/portfolio'); 
const jobRouter = require('./routers/job');
const applicationRouter = require('./routers/application');

const app = express();
const port = process.env.port || 3000;

const viewsPath = path.join(__dirname , '../src/templates');

app.use(express.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use('/admin' , adminRouter)
app.use(jobRouter);
app.use(portfolioRouter);
app.use(applicationRouter);
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

app.use(express.static(viewsPath));

app.get('/' , (req,res)=>{
    res.render("index");
})


app.listen(port , ()=>{
    console.log('App is listening at ' + `http://localhost:${port}`);
})
