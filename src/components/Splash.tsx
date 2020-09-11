import React from 'react'
import SplashRouter from './SplashRouter'
import styled from 'styled-components'
import { useRouteMessage } from '../hooks'

export const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () => {
  const msg = useRouteMessage()

  return (
    <Center className="mx-auto pt-5">
      <SplashRouter />
      <p className="p-3">{msg}</p>
    </Center>
  )
}

export default Splash