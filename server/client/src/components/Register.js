import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator'
import "./css/Register.css"

const Register = ()=>{
  const history = useHistory();
    const [user , setUser] = useState({
        username:"", email:"", password:"",confirmPassword:"", phoneNumber:"", age:"" , gender:"" , userImage:""
    });

    let name , value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({... user, [name]:value});
    }

    const PostData = async (e)=>{
      e.preventDefault();
      const { username , email , password , confirmPassword , age, phoneNumber, gender, userImage } = user;

      const res = await fetch("/register" , {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username,
          email, 
          password, 
          confirmPassword,
          phoneNumber,
          age,
          gender,
          userImage
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("please verify your email");
        console.log("Please verify your email")

        history.push("/login")
      }
    }

    const [errorMessage, setErrorMessage] = useState('')
  
  const validate = async (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password')
    } else {
      setErrorMessage('Not Strong Password')
    }
  }

    return(
        <>
<div className="body-background">
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="card p-3 text-center py-4">
            <h4>Create account</h4>
            <div> <span>Already have an account?</span> <a href="/login" className="text-decoration-none">Log In</a> </div>
            <form action="/register" method="POST" encType="multipart/form-data">
            <div className="mt-3 px-3"> 
            <input type="username" className="form-control" placeholder="Username"
             name="username"
             value={user.username}
             onChange={handleInputs}/> 
            </div>
            <div className="mt-3 px-3"> 
            <input type="email" className="form-control" placeholder="E-mail"
            name="email" aria-describedby="emailHelp"
            value={user.email}
            onChange={handleInputs}/> 
            </div>
            <div className="px-3 mt-3"> 
            <input type="password" className="form-control" placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputs}
            onKeyUp={(e) => validate(e.target.value)}/>
            </div><span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorMessage}</span>
            <div className="px-3 mt-3">
             <input type="password" className="form-control" placeholder="Confirm Password"
             name="confirmPassword"
             value={user.confirmPassword}
             onChange={handleInputs}/> 
             </div>
             <div className="mt-3 px-3"> 
            <input type="tel" className="form-control" placeholder="Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputs}/> 
            </div>
             <div className="mt-3 px-3"> 
            <input type="tel" className="form-control" placeholder="Age"
            name="age"
            value={user.age}
            onChange={handleInputs}/> 
            </div>
             <div className="px-3 mt-3">
             <div className="form-group">
                                            <div className="maxl">
                                            <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="maleGender"
                      value="Male"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="femaleGender">Male</label>
                  </div>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="femaleGender"
                      value="Female"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="maleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline mb-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="otherGender"
                      value="Other"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="otherGender">Other</label>
                  </div>
                                            </div>
                                        </div>
                                        </div>
            <div className="mt-3 d-grid px-3"> 
            <input name="register" id="registerButton" className="btn btn-primary"
              value="Sign Up" 
              onClick={PostData}
            /> 
            </div>
            <div className="px-3">
                <div className="mt-2 form-check d-flex flex-row"> 
                <input className="form-check-input" type="checkbox" value="" id="services"/> 
                <label className="form-check-label ms-2" for="services"> I have read and agree to the terms. </label> 
                </div>
            </div>
            </form>
        </div>
    </div>
</div>
        </>
    )
}

export default Register