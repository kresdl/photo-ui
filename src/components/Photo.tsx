import React from 'react'
import { SavedPhoto } from '../types'
import styled from 'styled-components'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`
const P = styled.p`
  font-size: 1.05rem;
`

const Photo: React.FC<SavedPhoto> = ({ id, title, url, comment }) =>
  <div className="p-3 border rounded">
    <div className="d-flex justify-content-between">
      <H2 className="mb-1">{title}</H2>
      <small>{id}</small>
    </div>
    <P className="mb-1 lead">{comment}</P>
    <small>{url}</small>
  </div>

export default Photo