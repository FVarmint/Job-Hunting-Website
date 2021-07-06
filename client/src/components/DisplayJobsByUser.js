import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie'

const DisplayJobsByUser = () => {

    const [jobs , setJobs] = useState([]);

    const authToken = Cookies.get("jwttoken");
    console.log(authToken);

    const apiUrl = 'http://localhost:5000/jobsbyuser';
    const fetchData = async () => {
      const response = await axios.get(apiUrl , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setJobs(response.data);
  }

  useEffect(()=>{
    fetchData();
  },[])
    return (
        <>
          <Navbar/> 
          <div className="jobs">
      {jobs.map((job) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{job.profile}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{job.companyName}</h6>
          <p class="card-text">{job.description}</p>
          <a href="#" class="btn btn-primary">Apply</a>
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
      ))}
    </div> 
        </>
    )
}

export default DisplayJobsByUser
