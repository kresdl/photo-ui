import React from 'react'
import User from './User'
import Splash from './Splash'
import { Switch, Route } from 'react-router-dom'

const MainRouter: React.FC = () =>
  <Switch>
    <Route path="/user">
      <User />
    </Route>
    <Route path="/">
      <Splash />
    </Route>
  </Switch>

export default MainRouter
