import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UploadPhoto from './UploadPhoto'
import UploadAlbum from './UploadAlbum'
import Organize from './Organize'
import { useNotify } from '../hooks'
import Message from './Message'

const Main: React.FC = () =>
  <main className="col pt-5">
    <Switch>
      <Route path="/user/organize">
        <Organize />
      </Route>
      <Route path="/user/upload-photo">
        <UploadPhoto />
      </Route>
      <Route path="/user/upload-album">
        <UploadAlbum />
      </Route>
    </Switch>
    <Message className="pt-3 pl-5" msg={useNotify().msg} />
  </main>

export default Main
