import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator'

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
      setErrorMessage('Is Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }

    return(
        <>
<div className="mt-2 col-md-12 mx-4">
<form action="/register" method="POST" encType="multipart/form-data">
<div className="mb-3">
    <label for="username" className="form-label">Username</label>
    <input type="username" className="form-control" id="usernameRegister" 
    name="username"
    value={user.username}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
    value={user.email}
    onChange={handleInputs}
    />
    </div>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div> */}
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password"
    value={user.password}
    onChange={handleInputs}
    onKeyUp={(e) => validate(e.target.value)}
    /><span style={{
      fontWeight: 'bold',
      color: 'red',
    }}>{errorMessage}</span>
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirmPassword" 
    name="confirmPassword"
    value={user.confirmPassword}
    onChange={handleInputs}
    />
  </div>
  
  <div className="form-outline">
                  <label className="form-label" for="phoneNumber">Phone Number</label>
                    <input type="tel" id="phoneNumber" className="form-control form-control-lg"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputs} 
                    />
                  </div>
                  <div className="form-outline">
                  <label className="form-label" for="age">Age</label>
                    <input type="tel" id="phoneNumber" className="form-control form-control-lg"
                    name="age"
                    value={user.age}
                    onChange={handleInputs} 
                    />
                  </div>
  
  <h6 className="mb-0 me-4">Gender: </h6>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="femaleGender"
                      value="Female"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="femaleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline mb-0 me-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="maleGender"
                      value="Male"
                      onChange={handleInputs}
                    />
                    <label className="form-check-label" for="maleGender">Male</label>
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
                  <div className="form-group">
                    <label for="file">Choose Image for User</label>
                    <input type="file" name="userImage"/>
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

export default Register