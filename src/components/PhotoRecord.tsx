import React from 'react'
import { Listeners, SavedPhoto } from '../types'
import styled from '@emotion/styled'
import Thumbnail from './Thumbnail'
import { Link } from 'react-router-dom'

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

type Props = SavedPhoto & Listeners<SavedPhoto>

const PhotoRecord: React.FC<Props> = ({ onSelect, onDelete, nav, ...item }) => {
  const label = <H2 className="mb-1">{item.title}</H2>

  return (
    <Div className="d-flex align-items-center p-3 border rounded" onClick={() => onSelect && onSelect(item)}>
      <Thumbnail className="mr-2" url={item.url} />
      <div>
        {nav ? <Link to={`/user/album/${item.id}`}>{label}</Link> : label}
        <P className="mb-1 lead">{item.comment}</P>
      </div>
      {onDelete && <button className="close ml-auto" onClick={() => onDelete(item)}>&times;</button>}
    </Div>
  )
}

export default PhotoRecord