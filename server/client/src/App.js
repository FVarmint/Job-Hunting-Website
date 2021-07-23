import React from 'react'
import { Route, Router, Switch } from "react-router-dom";
import Register from './Components/Register'
import Login from './Components/Login';
import Jobs from './Components/Jobs';
import Portfolios from './Components/Portfolios'
import ForgotPassword from './Components/ForgotPassword';
import ChangePassword from './Components/ChangePassword';
import UpdateProfile from './Components/UpdateProfile';
import DisplayJobs from './Components/DisplayJobs';
import DisplayPortfolios from './Components/DisplayPortfolios';
import DisplayJobsByUser from './Components/DisplayJobsByUser';
import DisplayPortfoliosByUser from './Components/DisplayPortfoliosByUser';
import MainPage from './Components/MainPage';
import Logout from './Components/Logout';
import VerifiedSuccessfully from './Components/VerifiedSuccessfully';
import UpdatePortfolio from './Components/UpdatePortfolio';
import UpdateJob from './Components/UpdateJob';
import DeletePortfolio from './Components/DeletePortfolio';
import DeleteJob from './Components/DeleteJob';
import ApplyForJob from './Components/ApplyForJob';
import ApplicationSent from './Components/ApplicationSent'
import ApplicationsByJob from './Components/ApplicationsByJob';
import PortfolioByApplication from './Components/PortfolioByApplication';
import IndexView from "./Components/IndexView"

const App = () => {
  return (
    <>
      <Route path="/register">
        <Register/>
      </Route>

      <Route path="/login">
        <Login/>
      </Route>

      <Route path="/jobs">
        <Jobs/>
      </Route>

      <Route path="/portfolio">
        <Portfolios/>
      </Route>

      <Route path="/forgotpassword">
        <ForgotPassword/>
      </Route>

      <Route exact path="/changepassword/:token">
        <ChangePassword/>
      </Route>

      <Route path="/updateprofile">
        <UpdateProfile/>
      </Route>

      <Route path="/displayjobs">
        <DisplayJobs/>
      </Route>

      <Route path="/displayportfolios">
        <DisplayPortfolios/>
      </Route>

      <Route path="/displayjobsbyuser">
        <DisplayJobsByUser/>
      </Route>

      <Route path="/displayportfoliosbyuser">
        <DisplayPortfoliosByUser/>
      </Route>

      <Route path="/mainpage">
        <MainPage/>
      </Route>

      <Route path="/logout">
        <Logout/>
      </Route>

      <Route exact path="/verifyuser/:confirmationCode">
        <VerifiedSuccessfully/>
      </Route>

      <Route exact path="/updateportfolios/:id">
        <UpdatePortfolio/>
      </Route>

      <Route exact path="/updatejobs/:id">
        <UpdateJob/>
      </Route>

      <Route exact path="/deleteportfolio/:id">
        <DeletePortfolio/>
      </Route>

      <Route exact path="/deletejob/:id">
        <DeleteJob/>
      </Route>

      <Route exact path="/applyforjob/:jobid">
        <ApplyForJob/>
      </Route>

      <Route exact path="/applyforjob/:jobid/:portfolioid">
        <ApplicationSent/>
      </Route>

      <Route exact path="/displayapplicationsbyjob/:jobid">
        <ApplicationsByJob/>
      </Route>

      <Route exact path="/portfoliobyapplication/:applicationid">
        <PortfolioByApplication/>
      </Route>

      <Route path="/">
        <IndexView/>
      </Route>
      
    </>
  )
}

export default App
