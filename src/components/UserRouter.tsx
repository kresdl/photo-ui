import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PhotoEditor from './PhotoEditor'
import AlbumEditor from './AlbumEditor'
import Organize from './Organize'

const UserRouter: React.FC = () =>
  <Switch>
    <Route path="/user/organize">
      <Organize />
    </Route>
    <Route path="/user/photos">
      <PhotoEditor />
    </Route>
    <Route path="/user/albums">
      <AlbumEditor />
    </Route>
    <Route exact path="/">
    </Route>
    <Route path="*">
      <Redirect to="/user" />
    </Route>  
  </Switch>

export default UserRouter
