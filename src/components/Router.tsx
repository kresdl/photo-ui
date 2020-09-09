import React, { useLayoutEffect } from 'react'
import Splash from './Splash'
import User from './User'
import { useNotify } from '../hooks'
import { useLocation, Switch, Route } from 'react-router-dom'
import { Message } from '../types'

const App: React.FC = () => {
  const { pathname, state: msg } = useLocation<Message>()
  const { notify } = useNotify()

  useLayoutEffect(() => {
    notify(msg)
  }, [pathname, msg, notify])

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
