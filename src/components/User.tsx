import React from 'react'
import Sidebar from './Sidebar'
import UserRouter from './UserRouter'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useAuth, useLogout } from '../hooks'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => {
  useLogout('/user/logout', '/')
  const [authenticated] = useAuth()

  return authenticated
    ?
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
    :
    <Redirect to="/" />
}

export default User