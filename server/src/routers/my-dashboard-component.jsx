// my-dashboard-component.jsx
import { ApiClient } from 'admin-bro'
import { Box } from '@admin-bro/design-system'
// import Header from '../templates/Header'
import React from 'react'

const api = new ApiClient()

const Dashboard = () => {
//   const [data, setData] = useState({})

  return (
    <Box variant="grey">
      <Box variant="white">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    <img src="https://www.gstatic.com/images/branding/product/1x/admin_512dp.png" alt="" width="40" height="40"/>
      <span class="navbar-brand mb-0 h1"> DASHBOARD</span>
    </a>
  </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#"></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"></a>
        </li>
      </ul>
      <form className="d-flex">
      
      </form>
    </div>
  </div>
</nav>
      </Box>
      <div class="mx-4">
      <center>
      <img src="https://pics.freeicons.io/uploads/icons/png/16096534681582799504-512.png" class="img-fluid" alt=""/>
      <h2>Welcome To the Admin Panel</h2>
      </center>
      </div>
    </Box>
  )
}

export default Dashboard