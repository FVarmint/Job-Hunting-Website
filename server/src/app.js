const express = require('express');
const path = require('path');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const usersRouter = require('./routers/users');
const adminRouter = require('./routers/admin');
// const bodyParser = require('body-parser');
const portfolioRouter = require('./routers/portfolio'); 
const jobRouter = require('./routers/job');
const applicationRouter = require('./routers/application');
const forgotPasswordRouter = require('./routers/forgotPassword');
const cors = require('cors');
// const engine = require('react-view-engine');

const app = express();
const port = process.env.PORT || 5000;

const viewsPath = path.join(__dirname , '../src/templates');

app.use(cors());
app.use(express.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use('/admin' , adminRouter)
app.use(jobRouter);
app.use(portfolioRouter);
app.use(applicationRouter);
app.use(forgotPasswordRouter);
// app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

// app.set('views', __dirname + '../src/templates');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// app.engine('js', engine.engine);
// app.set('view engine' , 'js');
// app.use(engine.handler);

app.use(express.static(viewsPath));

app.get('/' , (req,res)=>{
    res.render("index");
})

app.listen(port , ()=>{
    console.log('App is listening at ' + `http://localhost:${ port }`);
})

// app.listen(process.env.port || 3000);