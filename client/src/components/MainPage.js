import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import './MainPage.css'
import Header from './Header';

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
        <Header title="Job Hunting Website" searchBar={false} loggedInUser={user.username}/>
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
<h3>Jobs Uploaded By You</h3>
{jobs.map((job) => (
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">{job.profile}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{job.companyName}</h6>
          <p className="card-text">{job.description}</p>
          {/* <a href="#" className="btn btn-primary">Apply</a> */}
          {/* <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
      ))}

<div className="row">
    <h3>Portfolios Uploaded By You</h3>
      {portfolios.map((portfolio) => (
        <div className="card w-200">
        <div className="card-body">
          <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
          {/* <p className="card-text">{portfolio._id}</p> */}

          {/* <a href="#" className="btn btn-primary">Apply</a> */}
          {/* <a href="#" className="card-link">Another link</a> */}
          <a href={`/updateportfolios/${portfolio._id}`} className="card-link">update portfolio</a>

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
