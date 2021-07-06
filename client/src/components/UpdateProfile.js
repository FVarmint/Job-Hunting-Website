import React , {useState} from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'


const UpdateProfile = () => {

    const history = useHistory();
    const [user , setUser] = useState({
        username:""
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
      const { username } = user;

      const authToken = Cookies.get("jwttoken");
      console.log(authToken)

      const res = await fetch("/users/updateprofile" , {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          username
        })
      })

      const data = await res.json();
      console.log(data)

      if(res.status === 400 || !data){
        window.alert("Invalid Details")
        console.log("Invalid details")
      }
      else{
        window.alert("Profile Updated Successfully");
        console.log("Profile Updated Successfully");

        history.push("/")
      }
    }

    return (
        <>
          <Navbar/>
          <div className="mx-4 mt-4">
          <div class="row g-3 align-items-center">
  <div class="col-auto">
    <label for="inputPassword6" class="col-form-label">New Username</label>
  </div>
  <div class="col-auto">
    <input type="username" id="newUsername" class="form-control" aria-describedby="newUsername"
    name="username"
    value={user.username}
    onChange={handleInputs}

    />
  </div>
  <div className="col-auto">
  <input class="btn btn-primary" type="submit" value="Update Profile"
  onClick={PostData}/>
  </div>
</div>
</div>
        </>
    )
}

export default UpdateProfile
