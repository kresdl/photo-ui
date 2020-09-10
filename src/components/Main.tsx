import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PhotoPanel from './PhotoPanel'
import AlbumPanel from './AlbumPanel'
import Organize from './Organize'
import { useNotify } from '../hooks'
import Message from './Message'

const Main: React.FC = () =>
  <main className="col pt-5">
    <Switch>
      <Route path="/user/organize">
        <Organize />
      </Route>
      <Route path="/user/photos">
        <PhotoPanel />
      </Route>
      <Route path="/user/albums">
        <AlbumPanel />
      </Route>
    </Switch>
    <Message className="pt-3 pl-5" msg={useNotify().msg} />
  </main>

export default Main
