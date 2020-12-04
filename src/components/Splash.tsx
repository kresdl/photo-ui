import React from 'react'
import SplashRouter from './SplashRouter'
import styled from 'styled-components'
import store from '../lib/store'
import { observer } from 'mobx-react-lite'

const H1 = styled.h1`
  font-size: 4rem;
`

const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () => (
  <>
    <header className="jumbotron">
      <H1 className="text-center display-1 text-primary">Photo album X2000</H1>
      <p className="lead text-center">Your pixel pusher in cyberspace</p>
    </header>
    <Center className="mx-auto pt-5">
      <SplashRouter />
      {store.message.map(msg => <p className="m-0">{msg}</p>)}
    </Center>
  </>
)

export default observer(Splash)