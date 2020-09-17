import React, { useState } from 'react'
import MsgCtx from './MessageContext'
import MainRouter from './MainRouter'

const App: React.FC = () => {
  const messaging = useState<string[]>([])

  return (
    <MsgCtx.Provider value={messaging}>
      <div className="container-fluid p-0">
        <MainRouter />
      </div>
    </MsgCtx.Provider>
  )
}

export default App;
