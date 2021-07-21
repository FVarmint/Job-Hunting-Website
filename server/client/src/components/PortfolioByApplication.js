import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import './css/MainPage.css'
import Header from './Header';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const PortfolioByApplication = () => {

    const [portfolio , setPortfolio] = useState([]);

    const { applicationid } = useParams();

    const authToken = Cookies.get("jwttoken");
    // console.log(authToken);

    const apiUrlPortfolio = `http://localhost:5000/applicationdetails/${applicationid}`;
    const fetchDataPortfolio = async () => {
      const response = await axios.get(apiUrlPortfolio , {
          headers:{
            "Authorization" : `Bearer ${authToken}`
          }
      })
      console.log(response.data);
      setPortfolio(response.data);
  }

  useEffect(()=>{
      fetchDataPortfolio();
  },[])

    return (
        <>
            <Sidebar/>
            <div class="card">
  <div class="card-body">
  <h5 className="card-title">{portfolio.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p className="card-text">{portfolio.education}</p>
    {/* <a href="#" class="card-link">Card link</a> */}
    {/* <a href="#" class="card-link">Another link</a> */}
  </div>
</div>
        </>
    )
}

export default PortfolioByApplication
