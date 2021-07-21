import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import './css/MainPage.css'
import Header from './Header';
import Sidebar from './Sidebar';

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

    return (
        <>
        <Sidebar title="Job Hunting Website" searchBar={false} loggedInUser={user.username}/>
        
            <div className="split left">
  <div className="centered">
  <div className="users">
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">Hello, {user.username}</h5>
    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
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
    {/* <a href="#" className="btn btn-primary">Apply</a> */}
    {/* <a href="#" className="card-link">Another link</a> */}
    <a href={`/updatejobs/${job._id}`} className="card-link">update job</a>
    <a href={`/deletejob/${job._id}`} className="card-link">delete job</a>
    <a href={`/applicationsbyjob/${job._id}`} className="card-link">Applications</a>
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
          {/* <p className="card-text">{portfolio._id}</p> */}
          {/* <a href="#" className="btn btn-primary">Apply</a> */}
          {/* <a href="#" className="card-link">Another link</a> */}
          <a href={`/updateportfolios/${portfolio._id}`} className="card-link">update portfolio</a>
          <a href={`/deleteportfolio/${portfolio._id}`} className="card-link">delete portfolio</a>
        </div>
      </div>
      ))}
</div> 
</div>
</div>
        </>
    )
}

export default MainPage
