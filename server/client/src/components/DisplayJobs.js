import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar';

const DisplayJobs = () => {

    const [jobs , setJobs] = useState([]);

    const jobsApiUrl = 'https://jobhuntingapp.herokuapp.com/displayalljobs';
    const fetchData = async () => {
      const response = await axios.get(jobsApiUrl)
      console.log(response.data);
      setJobs(response.data);
  }

  useEffect(()=>{
    fetchData();
  },[])
              // axios({
              //   method: 'get',
              //   url: 'http://localhost:5000/displayjobs',
              //   responseType: 'application/json'
              // })
              //   .then((response)=>{
              //     console.log(response);
              //   });

    
    
      return (
        <>
          <Sidebar title="Jobs"/>
          <div className="jobs">
      {jobs.map((job) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{job.profile}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{job.companyName}</h6>
          <p class="card-text">{job.description}</p>
          <a href={`/applyforjob/${job._id}`} class="btn btn-primary">Apply</a>
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
      ))}
    </div>
        </>
      );
  };

    

export default DisplayJobs
