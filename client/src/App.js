import React from 'react'
import { Route } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import Jobs from './components/Jobs';
import Portfolios from './components/Portfolios'

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
    </>
  )
}

export default App
