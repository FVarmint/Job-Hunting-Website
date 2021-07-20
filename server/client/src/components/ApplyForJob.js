import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import './css/MainPage.css'
import Header from './Header';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

const ApplyForJob = () => {

    const { jobid } = useParams();

    const history = useHistory();

    const [portfolios , setPortfolios] = useState([]);

    const authToken = Cookies.get("jwttoken");
    // console.log(authToken);

    const apiUrlPortfolios = 'https://jobhuntingapp.herokuapp.com/portfoliosbyuser';
    const fetchDataPortfolios = async () => {
      const response = await axios.get(apiUrlPortfolios , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setPortfolios(response.data);
  }

  useEffect(()=>{
    fetchDataPortfolios();
  },[])

    return (
        <>
            <Header/>
            {portfolios.length===0 ? <h3>No Portfolio Found</h3>
:<h3>Portfolios Created By User</h3>}
{portfolios.length===0 ? <div className="mt-4">
  <a href="/portfolio">  
    <button type="button" className="btn btn-primary">Create Portfolio</button>  
  </a></div>
:portfolios.map((portfolio) => (
        <div className="card w-200">
        <div className="card-body">
          <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
          {/* <p className="card-text">{portfolio._id}</p> */}
          {/* <a href="#" className="btn btn-primary">Apply</a> */}
          {/* <a href="#" className="card-link">Another link</a> */}
          {/* <a href={`/updateportfolios/${portfolio._id}`} className="card-link">update portfolio</a>
          <a href={`/deleteportfolio/${portfolio._id}`} className="card-link">delete portfolio</a> */}
          <a href={`/applyforjob/${jobid}/${portfolio._id}`} className="card-link">Apply with this portfolio</a>
        </div>
      </div>
      ))}
        </>
    )
}

export default ApplyForJob
