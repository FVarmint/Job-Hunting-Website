import React , {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import "./css/Login.css"

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

      if(res.status===400 || !data ||res.status===401){
        window.alert("Something is Wrong!")
        console.log("Something is Wrong!")
      }
      else{
        window.alert("Login Successful");
        console.log("Login Successful")

        history.push("/mainpage")
      }
    }

    return (
        <>
        <div className="body-background">
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<div class="wrapper fadeInDown">
  <div id="formContent">

    <div class="fadeIn first">
      <img src="https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png" id="icon" alt="User Icon" />
    </div>

    <form action="/users/login" method="POST">
      <input type="username" id="login" class="fadeIn second" placeholder="Username"
      name="username"
      value={user.username}
      onChange={handleInputs}/>
      <input type="password" id="password" class="fadeIn third" placeholder="Password"
      name="password"
      value={user.password}
      onChange={handleInputs}/>
      <input type="submit" className="fadeIn fourth"
      value="Login"
      onClick={PostData}/>
    </form>
    <div id="formFooter">
      <a className="underlineHover" href="/forgotpassword">Forgot Password?</a>
      <a className="underlineHover" href="/register">Sign Up?</a>
    </div>
  </div>
</div>
</div>
        </>
    )
}

export default Login
