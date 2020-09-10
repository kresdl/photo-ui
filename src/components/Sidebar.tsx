import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  background-color: rgb(40, 40, 50);
`

const Sidebar: React.FC = () =>
  <Nav className="nav flex-column text-light h-100 px-5 pt-5">
    <NavLink className="nav-link" to="/user/photos">Photos</NavLink>
    <NavLink className="nav-link" to="/user/albums">Albums</NavLink>
    <NavLink className="nav-link mb-4" to="/user/organize">Organize</NavLink>
    <NavLink className="nav-link" to="/user/logout">Logout</NavLink>
  </Nav>

export default Sidebar