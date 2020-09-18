import React from 'react'
import User from './User'
import Splash from './Splash'
import { Switch, Route, Redirect } from 'react-router-dom'

const MainRouter: React.FC = () =>
  <Switch>
    <Route path="/user">
      <User />
    </Route>
    <Route exact path={['/', '/register']}>
      <Splash />
    </Route>
    <Route path="*">
      <Redirect to="/" />
    </Route>
  </Switch>

export default MainRouter
