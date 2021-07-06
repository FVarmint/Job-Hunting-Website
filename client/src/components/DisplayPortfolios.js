import React , { useState , useEffect} from 'react'
import axios from 'axios';
import Navbar from './Navbar';

const DisplayPortfolios = () => {

    const [portfolios , setPortfolios] = useState([]);

    const apiUrl = 'http://localhost:5000/displayportfolios';
    const fetchData = async () => {
      const response = await axios.get(apiUrl)
      console.log(response.data);
      setPortfolios(response.data);
  }

  useEffect(()=>{
    fetchData();
  },[])

    return (
        <>
          <Navbar/>  
          <div className="jobs">
      {portfolios.map((portfolio) => (
        <div class="card">
        <div class="card-body">
          <h5 class="card-title">{portfolio.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{portfolio.profile}</h6>
          <p class="card-text">{portfolio.projectDiscription}</p>
          {/* <a href="#" class="btn btn-primary">Apply</a> */}
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
      </div>
      ))}
    </div>
        </>
    )
}

export default DisplayPortfolios
