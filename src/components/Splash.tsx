import React from 'react'
import SplashRouter from './SplashRouter'
import styled from 'styled-components'
import Message from './Message'
import { useRouteMessage } from '../hooks'

export const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () => {
  const msg = useRouteMessage()

  return (
    <Center className="mx-auto pt-5">
      <SplashRouter />
      <Message msg={msg} />
    </Center>
  )
}

export default Splash