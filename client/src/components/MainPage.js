import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie'
import './MainPage.css'

const MainPage = () => {

    const [user , setUser] = useState([]);
    const [jobs , setJobs] = useState([]);
    const [portfolios , setPortfolios] = useState([]);

    const authToken = Cookies.get("jwttoken");
    console.log(authToken);

    const apiUrlUser = 'http://localhost:5000/users/me';
    const fetchDataUser = async () => {
      const response = await axios.get(apiUrlUser , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setUser(response.data);
  }
  const apiUrlJobs = 'http://localhost:5000/jobsbyuser';
    const fetchDataJobs = async () => {
      const response = await axios.get(apiUrlJobs , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setJobs(response.data);
  }

  const apiUrlPortfolios = 'http://localhost:5000/portfoliosbyuser';
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
        <Navbar/>
            <div className="split left">
  <div className="centered">
  <div className="users">
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Hello, {user.username}</h5>
    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
    <p class="card-text">{user.email}</p>
    <a href="/updateprofile" class="card-link">update profile</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    </div> 
    <div className="mt-xl-4">
  <a href="/jobs">  
    <button type="button" class="btn btn-primary">Add Job</button>  
  </a></div>
  <div className="mt-xl-4">
  <a href="/portfolio">  
    <button type="button" class="btn btn-primary">Create Portfolio</button>  
  </a></div>
  </div>
</div>

<div className="split right">
<div class="row">
<h3>Jobs Uploaded By You</h3>
{jobs.map((job) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{job.profile}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{job.companyName}</h6>
          <p class="card-text">{job.description}</p>
          {/* <a href="#" class="btn btn-primary">Apply</a> */}
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
      ))}

<div class="row">
    <h3>Portfolios Uploaded By You</h3>
      {portfolios.map((portfolio) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{portfolio.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p class="card-text">{portfolio.education}</p>
          {/* <a href="#" class="btn btn-primary">Apply</a> */}
          {/* <a href="#" class="card-link">Another link</a> */}
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
