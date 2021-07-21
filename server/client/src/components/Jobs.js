import React , {useState} from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import Sidebar from './Sidebar';

const Jobs = () => {
    const history = useHistory();
    const [job , setJob] = useState({
        companyName:"",profile:"",jobDescription:"",experience:"",jobDetails:"",jobLocation:""
    });
    let name , value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setJob({... job, [name]:value});
    }

    const PostData = async (e)=>{
        e.preventDefault();
        const { companyName , profile , jobDescription , experience , jobDetails , jobLocation } = job;

        const authToken = Cookies.get("jwttoken");
        console.log(authToken);

        const res = await fetch("/users/jobs" , {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization" : `Bearer ${authToken}`
          },
          body: JSON.stringify({
            companyName,
            profile, 
            jobDescription, 
            experience,
            jobDetails,
            jobLocation
          })
        })

        const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("Job Details Saved");
        console.log("Job Details Saved");

        history.push("/mainpage")
      }
    }

    return (
        <>
        <Sidebar title="Jobs"/>
<div className="mx-4">
<form action="/register" method="POST">
<div className="mb-3">
    <label for="companyName" className="form-label">Company Name</label>
    <input type="companyName" className="form-control" id="usernameRegister" 
    name="companyName"
    value={job.companyName}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
  <label for="profile" className="form-label">Job Profile</label>
    <input type="profile" className="form-control" id="usernameRegister" 
    name="profile"
    value={job.profile}
    onChange={handleInputs}
    />
   </div> 
  <div className="mb-3">
  <label for="jobDescripton" className="form-label">Job Description</label>
    <input type="jobDescription" className="form-control" id="usernameRegister" 
    name="jobDescription"
    value={job.jobDescription}
    onChange={handleInputs}
    />
   </div> 
  <div className="mb-3">
    <label for="experience" className="form-label">Experience Required</label>
    <input type="string" className="form-control" id="experience" name="experience"
    value={job.experience}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="jobDetails" className="form-label">Job Details</label>
    <input type="string" className="form-control" id="jobDeatils" name="jobDetails"
    value={job.jobDetails}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
  <label for="jobLocation" className="form-label">Job Location</label>
    <input type="jobLocation" className="form-control" id="usernameRegister" 
    name="jobLocation"
    value={job.jobLocation}
    onChange={handleInputs}
    />
   </div> 
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <div className="form-group form-button">
    <input type="submit" name="job" id="submitbutton" className="btn btn-primary"
    value="Create Job" 
    onClick={PostData}
    />
  </div>
</form>
</div>
        </>
    )
}

export default Jobs
