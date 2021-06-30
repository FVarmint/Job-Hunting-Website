import React , { useState } from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';

const Portfolios = ()=>{
  const history = useHistory();
    const [user , setUser] = useState({
        name:"",email:"",phone:"",address:"",education:"",profile:"",skillsets:"",projects:"",projectDiscription:"",linkedinProfile:"",workSampleLink:""
    });
    let name , value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({... user , [name]:value});
    }
    
    const PostData = async (e)=>{
        e.preventDefault();
        const { name , email , phone , address, education, profile, skillsets, projects, projectDiscription, linkedinProfile, workSampleLink } = user;
  
        const res = await fetch("/users/portfolios" , {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            phone, 
            address,
            education,
            profile,
            skillsets,
            projects,
            projectDiscription,
            linkedinProfile,
            workSampleLink
          })
        })

        const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Details not valid")
        console.log("Details not valid")
      }
      else{
        window.alert("Please fill required entries");
        console.log("Please fill required entries")

        history.push("/")
      }
    }
    return(
        <>
        <Navbar/>
<div className="mx-4">
<form action="/register" method="POST">
<div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="usernameRegister" 
    name="name"
    value={user.name}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
    value={user.email}
    onChange={handleInputs}
    /></div>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div> */}
  <div className="mb-3">
    <label for="phone" className="form-label">Phone</label>
    <input type="phone" className="form-control" id="phone" name="phone"
    value={user.phone}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name="address"
    value={user.address}
    onChange={handleInputs}
    />
  </div>
  <styledFieldSet>
    <div className="mb-3 mr-2">
        <legend>Highest education degree</legend>
        <label>
        <input type="radio" className="form-control" id="education" name="education"
        value="10th"
        onChange={handleInputs}
        />10th pass
        </label>
        <label>
        <input type="radio" className="form-control" id="education" name="education"
        value="12th"
        onChange={handleInputs}
        />12th pass
        </label>
        <label>
        <input type="radio" className="form-control" id="education" name="education"
        value="graduate"
        onChange={handleInputs}
        />Bachelor's degree
        </label>
        <label>
        <input type="radio" className="form-control" id="education" name="education"
        value="postGraduate"
        onChange={handleInputs}
        />Master's degree
        </label>
    </div>
  </styledFieldSet>
  <div className="mb-3">
    <label for="profile" className="form-label">Profile</label>
    <input type="text" className="form-control" id="profile" name="profile"
    value={user.profile}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="skillset" className="form-label">Skillset</label>
    <input type="text" className="form-control" id="skillset" name="skillset"
    value={user.skillset}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="projects" className="form-label">Projects</label>
    <input type="text" className="form-control" id="projects" name="projects"
    value={user.projects}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="projectDiscription" className="form-label">Project Discription</label>
    <styledTextArea name = "projectDiscription"/>
    <input type="text" className="form-control" id="projectDiscription" name="projectDiscription"
    value={user.projectDiscription}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="linkedinProfile" className="form-label">Linked Profile Link</label>
    <input type="text" className="form-control" id="linkedinProfile" name="linkedinProfile"
    value={user.linkedinProfile}
    onChange={handleInputs}
    />
  </div><div className="mb-3">
    <label for="workSampleLink" className="form-label">Work Sample Link</label>
    <input type="text" className="form-control" id="workSampleLink" name="workSampleLink"
    value={user.workSampleLink}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <div className="form-group form-button">
    <input type="submit" name="register" id="registerButton" className="btn btn-primary"
    value="Register" 
    onClick={PostData}
    />
  </div>
</form>
</div>
        </>
    )
}

export default Portfolios
