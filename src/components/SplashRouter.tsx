import React from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Switch } from 'react-router-dom'

const SplashRouter: React.FC = () =>
  <Switch>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/">
      <Login />
    </Route>
  </Switch>

export default SplashRouter