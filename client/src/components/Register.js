import React, {useState} from 'react';
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';
import validator from 'validator'

const Register = ()=>{
  const history = useHistory();
    const [user , setUser] = useState({
        username:"",email:"",password:"",confirmPassword:""
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
      const { username , email , password , confirmPassword } = user;

      const res = await fetch("/register" , {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username,
          email, 
          password, 
          confirmPassword
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
        <Navbar/>
<div className="mx-4">
<form action="/register" method="POST">
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
    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"
    value={user.confirmPassword}
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

export default Register