const express = require('express');
const path = require('path');
const registerRouter = require('./src/routers/register');
const loginRouter = require('./src/routers/login');
const usersRouter = require('./src/routers/users');
const adminRouter = require('./src/routers/admin');
const bodyParser = require('body-parser');
const portfolioRouter = require('./src/routers/portfolio'); 
const jobRouter = require('./src/routers/job');
const applicationRouter = require('./src/routers/application');
const forgotPasswordRouter = require('./src/routers/forgotPassword');
const cors = require('cors');
// const engine = require('react-view-engine');

const app = express();
const port = process.env.PORT || 5000;

// const viewsPath = path.join(__dirname , './src/templates');
// app.use(bodyParser.json())
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(registerRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use('/admin' , adminRouter)
app.use(jobRouter);
app.use(portfolioRouter);
app.use(applicationRouter);
app.use(forgotPasswordRouter);



// app.set('view engine' , 'hbs')
// app.set('views' , viewsPath)

// app.set('views', __dirname + '../src/templates');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// app.engine('js', engine.engine);
// app.set('view engine' , 'js');
// app.use(engine.handler);

// app.use(express.static(viewsPath));

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port , ()=>{
    console.log('App is listening');
})

// app.listen(process.env.port || 3000);