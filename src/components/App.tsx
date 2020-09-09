import React, { useState, useLayoutEffect } from 'react'
import Splash from './Splash'
import User from './User'
import { useLocation, Switch, Route } from 'react-router-dom'
import Ctx from './MessageContext'

function App() {
  const messaging = useState<string[]>([]),
    { pathname, state: msg } = useLocation<string>(),
    [,setMsg] = messaging

  useLayoutEffect(() => {
    setMsg([msg] || [])
  }, [pathname, msg, setMsg])

  return (
    <Ctx.Provider value={messaging}>
      <div className="container-fluid">
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </div>
    </Ctx.Provider>
  )
}

export default App;
