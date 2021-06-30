import React , {useState} from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();
    const [user , setUser] = useState({
        username:"", password:""
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
      const { username , password } = user;

      const res = await fetch("/users/login" , {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status == 400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("Login Successful");
        console.log("Login Successful")

        history.push("/jobs")
      }
    }

    return (
        <>
            <Navbar/>
            <div className="mx-4">
            <form action="/users/login" method="POST">
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Username</label>
    <input type="username" className="form-control" id="usernameLogin" aria-describedby="emailHelp"
    name="username"
    value={user.username}
    onChange={handleInputs}
    />
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
    name="password"
    value={user.password}
    onChange={handleInputs}
    />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <input class="btn btn-primary" type="submit" value="Login"
  onClick={PostData}/>
</form>
</div>
        </>
    )
}

export default Login
