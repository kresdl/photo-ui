import React from 'react'
import Sidebar from './Sidebar'
import Panel from './Panel'

const User: React.FC = () =>
  <div className="row no-gutters vh-100">
    <header className="col-auto">
      <Sidebar />
    </header>
    <main className="col">
      <div className="pt-5 px-5">
        <Panel />
      </div>
    </main>
  </div>

export default User