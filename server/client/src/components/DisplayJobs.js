import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar';

const DisplayJobs = () => {

    const [jobs , setJobs] = useState([]);

    const apiUrl = 'https://jobhuntingapp.herokuapp.com/displayalljobs';
    const fetchData = async () => {
      const response = await axios.get(apiUrl)
      console.log(response.data);
      setJobs(response.data);
  }

  useEffect(()=>{
    fetchData();
  },[])
  
  const [searchJob , setSearchJob] = useState('');

      return (
        <>

          <Sidebar title="Jobs"/>
          <Header title="Jobs"/>
        {/* <button class="btn btn-outline-success" type="submit">Search</button>  */}
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange = {event =>{setSearchJob(event.target.value)}}/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
          <div className="jobs">
      {jobs.filter((job)=>{
        if (searchJob == ""){
          return job
        } 
        else if(job.profile.toLowerCase().includes(searchJob.toLowerCase())){
          return job
        }
        else if(job.companyName.toLowerCase().includes(searchJob.toLowerCase())){
          return job
        }
      }).map((job) => (
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
