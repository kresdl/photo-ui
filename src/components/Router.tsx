import React from 'react'
import Splash from './Splash'
import User from './User'
import { useRouteMessage, useLogout } from '../hooks'
import { Switch, Route } from 'react-router-dom'

const App: React.FC = () => {
  useLogout('/user/logout', '/')
  useRouteMessage()

  return (
    <Switch>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/">
        <Splash />
      </Route>
    </Switch>
  )
}

export default App;
