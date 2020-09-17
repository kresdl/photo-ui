import React, { useState } from 'react'
import MsgCtx from './MessageContext'
import AuthCtx from './AuthContext'
import MainRouter from './MainRouter'

const App: React.FC = () => {
  const messaging = useState<string[]>([])
  const auth = useState<string | null>(null)

  return (
    <AuthCtx.Provider value={auth}>
      <MsgCtx.Provider value={messaging}>
        <div className="container-fluid p-0">
          <MainRouter />
        </div>
      </MsgCtx.Provider>
    </AuthCtx.Provider>
  )
}

export default App;
