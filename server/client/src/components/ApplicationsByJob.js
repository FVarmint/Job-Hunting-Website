import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import './css/MainPage.css'
import Header from './Header';
import { useParams } from 'react-router-dom';

const ApplicationsByJob = () => {

    const [applications , setApplications] = useState([]);

    const authToken = Cookies.get('jwttoken');
    console.log(authToken);

    const { jobid } = useParams();

    const apiUrlApplication = `http://localhost:5000/applicationsbyjob/${jobid}`;
    const fetchDataApplication = async() => {
        const response = await axios.get(apiUrlApplication , {
            headers:{
                "Authorization": `Bearer ${authToken}`
            }
        })
        console.log(response.data);
        setApplications(response.data)
    }

    useEffect(()=>{
        fetchDataApplication();
    },[])

    return (
        <>
            <Header/>
            <div className="applications">
      {applications.map((application) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{application._id}</h5>
          {/* <h6 class="card-subtitle mb-2 text-muted">{application.jobID}</h6> */}
          {/* <p class="card-text">{application.portfolioID}</p> */}
          <a href={`/portfoliobyapplication/${application._id}`} class ="btn btn-primary">View Portfolio</a>
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
      ))}
    </div> 
        </>
    )
}

export default ApplicationsByJob
