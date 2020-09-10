import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
  background-color: rgb(40, 40, 50);
`

const Sidebar: React.FC = () =>
  <Header className="col-auto pt-5">
    <nav className="nav flex-column text-light px-5">
      <NavLink className="nav-link" to="/user/photos">Photos</NavLink>
      <NavLink className="nav-link" to="/user/albums">Albums</NavLink>
      <NavLink className="nav-link" to="/user/organize">Organize</NavLink>
      <NavLink className="nav-link" to="/user/logout">Logout</NavLink>
    </nav>
  </Header>

export default Sidebar