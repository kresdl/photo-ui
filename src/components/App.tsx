import React, { useState } from 'react'
import Ctx from './MessageContext'
import Router from './Router'

const App: React.FC = () => {
  const messaging = useState<string[]>([])

  return (
    <Ctx.Provider value={messaging}>
      <div className="container-fluid">
        <Router />
      </div>
    </Ctx.Provider>
  )
}

export default App;
