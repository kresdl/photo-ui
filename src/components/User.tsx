import React from 'react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import { useLogout } from '../lib/hooks'
import { Route, Switch, useHistory } from 'react-router-dom'
import store from '../lib/store'
import Organize from './Organize'
import PhotoEditor from './PhotoEditor'
import AlbumEditor from './AlbumEditor'
import Slide from './Carousel/Slide/Slide'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => {
  const history = useHistory()
  if (!store.auth) history.push('/')

  useLogout('/user/logout', '/')

  return (
    <>
      <Route path="/user/edit">
        <Wrapper className="row no-gutters">
          <header className="col-md-auto">
            <Sidebar />
          </header>
          <main className="col-md pt-5 px-3">
            <Route path="/user/edit/organize">
              <Organize />
            </Route>
            <Route path="/user/edit/photos">
              <PhotoEditor />
            </Route>
            <Route path="/user/edit/albums">
              <AlbumEditor />
            </Route>
          </main>
        </Wrapper>
      </Route>
      <Route path="/user/album/:id">
        <Slide />
      </Route>
    </>
  )
}

export default User