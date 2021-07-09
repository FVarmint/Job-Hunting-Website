import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Cookie from 'js-cookie';

const Logout = () => {
    const history = useHistory();
    const authToken = Cookie.get("jwttoken");
    // console.log(authToken);
    const logoutFunction = async()=>{
        const res = await fetch('/users/logout' , {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${authToken}`
            }
        })
        const data = await res.json();
        // console.log(data)

      if(res.status===400 || !data){
        window.alert("Something Went Wrong")
        console.log("Something Went Wrong")
      }
      else{
        window.alert("You will be redirected to the login page");
        console.log("You will be redirected to the login page");

        history.push("/login")
      }
    }

    useEffect(()=>{
        logoutFunction();
    },[])

    return (
        <>
        <div className="mx-4">
          <form>
  <div class="mb-3">
    <div id="emailHelp" class="form-text">User Logged Out</div>
  </div>
  <button type="submit" class="btn btn-primary">Login Again</button>
</form>
</div>
        </>
    )
}

export default Logout
