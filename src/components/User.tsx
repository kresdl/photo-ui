import React from 'react'
import Sidebar from './Sidebar'
import UserRouter from './UserRouter'

const User: React.FC = () =>
  <div className="row no-gutters vh-100">
    <header className="col-auto">
      <Sidebar />
    </header>
    <main className="col">
      <div className="pt-5 px-5">
        <UserRouter />
      </div>
    </main>
  </div>

export default User