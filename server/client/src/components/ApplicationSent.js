import React , {useState ,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import { useParams } from 'react-router-dom';

const ApplicationSent = () => {

    const history = useHistory();

    const { jobid , portfolioid } = useParams();

    const authToken = Cookies.get("jwttoken");
    // console.log(authToken);

    const PostData = async(e)=>{
        const res = await fetch('/applyforjob/' + jobid + '/' + portfolioid , {
            method: "POST",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${authToken}`   
            }
        })
        const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        window.alert("There is some issue. Please Try Again");
        console.log("There is some issue. Please Try Again");
      }
      else{
        window.alert("Your application was sent");
        console.log("Your application was sent");

        history.push("/mainpage")
      }
    }

    useEffect(()=>{
        PostData();
    },[])

    return (
        <>
            <Header/>
        </>
    )
}

export default ApplicationSent
