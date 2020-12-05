import React from 'react'
import { SavedPhoto } from '../types'
import styled from '@emotion/styled'
import Thumbnail from './Thumbnail'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const P = styled.p`
  font-size: 1.05rem;
`

const Div = styled.div`
  margin-bottom: -1px
`

const PhotoRecord: React.FC<SavedPhoto> = ({ id, title, url, comment }) =>
  <Div className="p-3 border rounded d-flex align-items-center">
    <Thumbnail url={url} />
    <div className="ml-3 flex-grow-1">
      <div className="d-flex justify-content-between">
        <H2 className="mb-1">{title}</H2>
        <small>{id}</small>
      </div>
      <P className="mb-1 lead">{comment}</P>
    </div>
  </Div>

export default PhotoRecord