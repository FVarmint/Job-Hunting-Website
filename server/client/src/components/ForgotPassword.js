import React , {useState} from 'react'
import { useHistory } from "react-router-dom"
import Header from './Header';
// import Sidebar from './Sidebar';

const ForgotPassword = () => {

    const history = useHistory();

    const [user , setUser] = useState({
        email:""
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
      const {email} = user;

      const res = await fetch("/forgotpassword" , {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("check your email");
        console.log("check your email")

        history.push("/login")
      }
    }

    return (
        <>
            <Header/>
            <form action="/forgotpassword" method="POST">
  <div className="mx-4">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    name="email"
    value={user.email}
    onChange={handleInputs}/>
    <div className="mt-2 col-md-12">
    <div className="form-group form-button">
    <input type="submit" name="sendEmail" id="sendEmail" className="btn btn-primary"
    value="Send Email" 
    onClick={PostData}
    />
  </div>
  </div>
  </div>
</form>
        </>
    )
}

export default ForgotPassword
