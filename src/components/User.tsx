import React from 'react'
import Sidebar from './Sidebar'
import UserRouter from './UserRouter'
import styled from 'styled-components'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () =>
  <Wrapper className="row no-gutters">
    <header className="col-md-auto">
      <Sidebar />
    </header>
    <main className="col-md">
      <div className="pt-5 px-5">
        <UserRouter />
      </div>
    </main>
  </Wrapper>

export default User