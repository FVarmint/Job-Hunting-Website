import React from 'react'
import { Route, Router, Switch } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import Jobs from './components/Jobs';
import Portfolios from './components/Portfolios'
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import UpdateProfile from './components/UpdateProfile';
import DisplayJobs from './components/DisplayJobs';
import DisplayPortfolios from './components/DisplayPortfolios';
import DisplayJobsByUser from './components/DisplayJobsByUser';
import DisplayPortfoliosByUser from './components/DisplayPortfoliosByUser';
import MainPage from './components/MainPage';
import Logout from './components/Logout';
import VerifiedSuccessfully from './components/VerifiedSuccessfully';
import UpdatePortfolio from './components/UpdatePortfolio';
import UpdateJob from './components/UpdateJob';
import DeletePortfolio from './components/DeletePortfolio';
import DeleteJob from './components/DeleteJob';
import ApplyForJob from './components/ApplyForJob';
import ApplicationSent from './components/ApplicationSent'
import ApplicationsByJob from './components/ApplicationsByJob';
import PortfolioByApplication from './components/PortfolioByApplication';
import Sidebar from './components/Sidebar';

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

      <Route exact path="/applicationsbyjob/:jobid">
        <ApplicationsByJob/>
      </Route>

      <Route exact path="/portfoliobyapplication/:applicationid">
        <PortfolioByApplication/>
      </Route>
      
    </>
  )
}

export default App
