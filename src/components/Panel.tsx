import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PhotoEditor from './PhotoEditor'
import AlbumEditor from './AlbumEditor'
import Organize from './Organize'

const Panel: React.FC = () =>
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
  </Switch>

export default Panel
