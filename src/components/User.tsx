import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useNotify } from '../hooks'
import Sidebar from './Sidebar'
import Main from './Main'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
`

const User: React.FC = () => {
  const history = useHistory(),
    { pathname } = useLocation(),
    { notify } = useNotify()

  useEffect(() => {
    if (pathname === '/user/logout') {
      sessionStorage.removeItem('token')
      history.push('/')
    }
  }, [history, notify, pathname])

  return (
    <Wrapper className="row">
      <Sidebar />
      <Main />
    </Wrapper>
  )
}

export default User