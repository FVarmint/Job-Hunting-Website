import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple, red } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  }
}))

const MainPage = () => {

    const [user , setUser] = useState([]);
    const [jobs , setJobs] = useState([]);
    const [portfolios , setPortfolios] = useState([]);

    const authToken = Cookies.get("jwttoken");
    // console.log(authToken);

    const apiUrlUser = 'https://jobhuntingapp.herokuapp.com/users/me';
    const fetchDataUser = async () => {
      const response = await axios.get(apiUrlUser , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setUser(response.data);
  }
  const apiUrlJobs = 'https://jobhuntingapp.herokuapp.com/jobsbyuser';
    const fetchDataJobs = async () => {
      const response = await axios.get(apiUrlJobs , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setJobs(response.data);
  }

  const apiUrlPortfolios = 'https://jobhuntingapp.herokuapp.com/portfoliosbyuser';
    const fetchDataPortfolios = async () => {
      const response = await axios.get(apiUrlPortfolios , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setPortfolios(response.data);
  }

  useEffect(()=>{
    fetchDataUser();
    fetchDataJobs();
    fetchDataPortfolios();
  },[])

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

  const classes = useStyles();

    return (
      <>
<div style={{ 
      backgroundImage: `url("https://www.pngmagic.com/product_images/website-background-image-size-psd-vector-photo.jpg")`,
      backgroundRepeat: 'repeat',
      height:'2000px'
    }}>
        <div id='main'>
        <Header loggedInUser={user.username}/>
<Container spacing={10}>
<Grid container spacing={10}>
  <Grid item xs={12} sm={6} md={4}>
    <Paper className={classes.paper}>
      <div className="container">
    <div className="users">
    <ThemeProvider theme={theme}>
  <div className="card border-dark mb-3">
  <div className="card-body">
  <img className="card-img-top" src="https://icon-library.com/images/code-icon-png/code-icon-png-20.jpg" alt="Card image cap"/>
  <br/>
    <h5 className="card-title">Hi, {user.username}</h5>
    <p className="card-text">{user.email}</p>
    <a href="/updateprofile" className="card-link">update profile</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div></ThemeProvider>
    </div> 
    <div className="mt-4">
  <a href="/jobs">  
    <button type="button" className="btn btn-primary">Add Job</button>  
  </a></div>
  <div className="mt-4">
  <a href="/portfolio">  
    <button type="button" className="btn btn-primary">Create Portfolio</button>  
  </a></div>
  <div className="mt-4">
  <a href="/displayjobs">  
    <button type="button" className="btn btn-primary">Find Jobs</button>  
  </a>
  </div></div>
    </Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
  <Paper className={classes.paper}>
  <div className="container">
  {jobs.length===0 ? <h3>No Jobs Found</h3>
:<h3>Jobs Uploaded</h3>}
{jobs.length===0 ? <div className="mt-4">
  <a href="/jobs">  
    <button type="button" className="btn btn-primary">Add Job</button>  
  </a></div>
:jobs.map((job) => (
  <div className="card border-dark mb-3">
  <div className="card-body">
  <img className="card-img-top" src="https://cdn-icons-png.flaticon.com/512/1089/1089129.png" alt="Card image cap"/>
    <h5 className="card-title">{job.profile}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
    <p className="card-text">{job.description}</p>
    <a href={`/updatejobs/${job._id}`} className="card-link">Update</a>
    <a href={`/deletejob/${job._id}`} className="card-link">Delete</a>
    <a href={`/displayapplicationsbyjob/${job._id}`} className="card-link">Applications</a>
  </div>
</div>
))}</div></Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
  <Paper className={classes.paper}>
  <div className="container">
  {portfolios.length===0 ? <h3>No Portfolio Found</h3>
:<h3>Portfolios</h3>}
{portfolios.length===0 ? <div className="mt-4">
  <a href="/portfolio">  
    <button type="button" className="btn btn-primary">Create Portfolio</button>  
  </a></div>
:portfolios.map((portfolio) => (
        <div className="card border-dark mb-3">
        <div className="card-body">
        <img className="card-img-top" src="https://www.pngitem.com/pimgs/m/228-2281314_clipart-computer-circle-icon-png-transparent-png.png" alt="Card image cap"/>
          <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
          <a href={`/updateportfolios/${portfolio._id}`} className="card-link">Update</a>
          <a href={`/deleteportfolio/${portfolio._id}`} className="card-link">Delete</a>
        </div>
      </div>
      ))}
      </div>
  </Paper>
  </Grid>
  </Grid>
  </Container>
  </div>
  </div>
  </>
    )
}

export default MainPage

