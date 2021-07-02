import React , {useState} from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {

    const { token } = useParams();

    const history = useHistory();
    
    const [user , setUser] = useState({
        password:""
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

      const {password} = user;

    //   console.log({ token })
    //   console.log(token)

      const res = await fetch("/changepassword/"+token, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          password
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("your password has been updated");
        console.log("your password has been updated")

        history.push("/login")
      }
    }


    return (
        <>
          <Navbar/>  
          <div className="mx-4">
          <div className="row g-3 align-items-center">
  <div className="col-auto">
    <label for="inputPassword6" className="col-form-label">New Password</label>
  </div>
  <div className="col-auto">
    <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"
    name="password"
    value={user.password}
    onChange={handleInputs}/>
  </div>
  <div className="col-auto">
  <input type="submit" name="changepassword" id="changePasswordButton" className="btn btn-primary"
    value="Change Password" 
    onClick={PostData}
    />
  </div>
</div>
</div>
        </>
    )
}

export default ChangePassword
