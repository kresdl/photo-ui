import React from 'react'
import Sidebar from './Sidebar'
import UserRouter from './UserRouter'
import styled from '@emotion/styled'
import { useLogout } from '../lib/hooks'
import { useHistory } from 'react-router-dom'
import store from '../lib/store'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => {
  const history = useHistory()
  if (!store.auth) history.push('/')
  
  useLogout('/user/logout', '/')

  return (
    <Wrapper className="row no-gutters">
      <header className="col-md-auto">
        <Sidebar />
      </header>
      <main className="col-md">
        <div className="pt-5 px-3">
          <UserRouter />
        </div>
      </main>
    </Wrapper>
  )
}

export default User