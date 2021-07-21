import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
// import './css/MainPage.css'
import Header from './Header';
import Sidebar from './Sidebar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

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

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

    return (
        <>
        {/* <Header/> */}
        <Sidebar title="Job Hunting Website" searchBar={false} loggedInUser={user.username}/>
        {/* <div className="body-background">
            <div className="split left">
  <div className="centered">
  <div className="users">
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">Hello, {user.username}</h5>
    <p className="card-text">{user.email}</p>
    <a href="/updateprofile" className="card-link">update profile</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>
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
  </div>
  </div>
</div>

<div className="split right">
<div className="row">
{jobs.length===0 ? <h3>No Jobs Found</h3>
:<h3>Jobs Uploaded By User</h3>}
{jobs.length===0 ? <div className="mt-4">
  <a href="/jobs">  
    <button type="button" className="btn btn-primary">Add Job</button>  
  </a></div>
:jobs.map((job) => (
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">{job.profile}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
    <p className="card-text">{job.description}</p>
    <a href={`/updatejobs/${job._id}`} className="card-link">update job</a>
    <a href={`/deletejob/${job._id}`} className="card-link">delete job</a>
    <a href={`/displayapplicationsbyjob/${job._id}`} className="card-link">Applications</a>
  </div>
</div>
))}

<div className="row">
{portfolios.length===0 ? <h3>No Portfolio Found</h3>
:<h3>Portfolios Created By User</h3>}
{portfolios.length===0 ? <div className="mt-4">
  <a href="/portfolio">  
    <button type="button" className="btn btn-primary">Create Portfolio</button>  
  </a></div>
:portfolios.map((portfolio) => (
        <div className="card w-200">
        <div className="card-body">
          <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
          <a href={`/updateportfolios/${portfolio._id}`} className="card-link">update portfolio</a>
          <a href={`/deleteportfolio/${portfolio._id}`} className="card-link">delete portfolio</a>
        </div>
      </div>
      ))}
</div> 
</div>
</div>
</div> */}
<Container spacing={10}>
<Grid container>
  <Grid item xs={12} sm={6} md={4}>
    <Paper>
      <div className="container">
    <div className="users">
    <ThemeProvider theme={theme}>
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">Hello, {user.username}</h5>
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
  <Paper>
  <div className="container">
  {jobs.length===0 ? <h3>No Jobs Found</h3>
:<h3>Jobs Uploaded By User</h3>}
{jobs.length===0 ? <div className="mt-4">
  <a href="/jobs">  
    <button type="button" className="btn btn-primary">Add Job</button>  
  </a></div>
:jobs.map((job) => (
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">{job.profile}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
    <p className="card-text">{job.description}</p>
    <a href={`/updatejobs/${job._id}`} className="card-link">update job</a>
    <a href={`/deletejob/${job._id}`} className="card-link">delete job</a>
    <a href={`/displayapplicationsbyjob/${job._id}`} className="card-link">Applications</a>
  </div>
</div>
// {/* <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             J
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             {/* <MoreVertIcon> */}
//             <NavDropdown title="" id="basic-nav-dropdown">
//             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//           </NavDropdown>
//           {/* </MoreVertIcon> */}
//           </IconButton>
//         }
//         title={job.profile}
//         subheader={job.companyName}
//       />
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Job Description:</Typography>
//           <Typography paragraph>
//             {job.jobDescription}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card> */}
))}</div></Paper>
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
  <Paper>
  <div className="container">
  {portfolios.length===0 ? <h3>No Portfolio Found</h3>
:<h3>Portfolios Created By User</h3>}
{portfolios.length===0 ? <div className="mt-4">
  <a href="/portfolio">  
    <button type="button" className="btn btn-primary">Create Portfolio</button>  
  </a></div>
:portfolios.map((portfolio) => (
        <div className="card w-200">
        <div className="card-body">
          <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
          <a href={`/updateportfolios/${portfolio._id}`} className="card-link">update portfolio</a>
          <a href={`/deleteportfolio/${portfolio._id}`} className="card-link">delete portfolio</a>
        </div>
      </div>
      ))}
      </div>
  </Paper>
  </Grid>
  </Grid>
  </Container>
        </>
    )
}

export default MainPage

