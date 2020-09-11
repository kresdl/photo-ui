import React, { useState } from 'react'
import Ctx from './MessageContext'
import MainRouter from './MainRouter'
import { useLogout } from '../hooks'

const App: React.FC = () => {
  const messaging = useState<string[]>([])
  useLogout('/user/logout', '/')

  return (
    <Ctx.Provider value={messaging}>
      <div className="container-fluid p-0">
        <MainRouter />
      </div>
    </Ctx.Provider>
  )
}

export default App;
