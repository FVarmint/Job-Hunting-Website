import React , {useEffect} from 'react'
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

const VerifiedSuccessfully = () => {
    const { confirmationCode } = useParams();
    const history = useHistory();

    const verifyUser = async()=>{
        await fetch('/register/'+confirmationCode , {
            method:"GET",
            headers:{
                "content-type":"application/json",
            }
        });
        // const data = await res.json();

            window.alert("You will be redirected to the login page now");
            console.log("You will be redirected to the login page now");
    
            history.push("/login");
    }

    useEffect(()=>{
        verifyUser();
    },[])

    return (
        <>
            <h1 class="display-6">User Verified Successfully</h1>
        </>
    )
}

export default VerifiedSuccessfully
