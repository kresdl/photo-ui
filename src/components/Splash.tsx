import React from 'react'
import SplashRouter from './SplashRouter'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

export const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () =>
  <Center className="mx-auto pt-5">
    <SplashRouter />
    <p className="pt-3">{useLocation().state}</p>
  </Center>

export default Splash