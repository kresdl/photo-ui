import React from 'react'
import { SavedAlbum } from '../types'
import styled from 'styled-components'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Album: React.FC<SavedAlbum> = ({ id, title }) =>
  <div className="d-flex justify-content-between p-3 border rounded">
    <H2 className="mb-1">{title}</H2>
    <small>{id}</small>
  </div>

export default Album