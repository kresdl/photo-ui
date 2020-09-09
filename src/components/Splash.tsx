import React from 'react'
import Login from './Login'
import Register from './Register'
import Message from './Message'
import { useNotify } from '../hooks'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

export const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () =>
  <Center className="mx-auto pt-5">
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
    <Message msg={useNotify().msg} />
  </Center>

export default Splash