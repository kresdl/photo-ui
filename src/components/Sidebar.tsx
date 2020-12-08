import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const Nav = styled.nav`
  background-color: rgb(24, 24, 28);
`

const Sidebar: React.FC = () =>
  <Nav className="nav flex-md-column text-light h-100 px-md-5 pt-md-5 py-2">
    <NavLink className="nav-link" to="/user/edit/photos">Photos</NavLink>
    <NavLink className="nav-link" to="/user/edit/albums">Albums</NavLink>
    <NavLink className="nav-link mb-md-4" to="/user/edit/organize">Organizer</NavLink>
    <NavLink className="nav-link" to="/user/logout">Logout</NavLink>
  </Nav>

export default Sidebar