import React from 'react'
import Sidebar from './Sidebar'
import Panel from './Panel'
import styled from '@emotion/styled'

const Header = styled.header`
  background-color: rgb(40, 40, 50);
`

const User: React.FC = () =>
  <div className="row vh-100">
    <Header className="col-auto">
      <Sidebar />
    </Header>
    <main className="col">
      <div className="pt-5 px-5">
        <Panel />
      </div>
    </main>
  </div>

export default User