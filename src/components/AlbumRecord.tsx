import React from 'react'
import { SavedAlbum } from '../types'
import styled from '@emotion/styled'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

const AlbumRecord: React.FC<SavedAlbum> = ({ id, title }) =>
  <Div className="d-flex justify-content-between p-3 border rounded">
    <H2 className="mb-1">{title}</H2>
    <small>{id}</small>
  </Div>

export default AlbumRecord