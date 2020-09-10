import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar: React.FC = () =>
  <nav className="nav flex-column text-light h-100 px-5 pt-5">
    <NavLink className="nav-link" to="/user/photos">Photos</NavLink>
    <NavLink className="nav-link" to="/user/albums">Albums</NavLink>
    <NavLink className="nav-link mb-4" to="/user/organize">Organize</NavLink>
    <NavLink className="nav-link" to="/user/logout">Logout</NavLink>
  </nav>

export default Sidebar