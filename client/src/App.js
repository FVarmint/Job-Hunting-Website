import React from 'react'
import { Route } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import Jobs from './components/Jobs';
import Portfolios from './components/Portfolios'
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import UpdateProfile from './components/UpdateProfile';
import DisplayJobs from './components/DisplayJobs';

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
    </>
  )
}

export default App
