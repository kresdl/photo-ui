import React from 'react'
import { Listeners, SavedAlbum } from '../types'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

type Props = SavedAlbum & Listeners<SavedAlbum>

const AlbumRecord: React.FC<Props> = ({ onSelect, onDelete, nav, ...item }) => {
  const label = <H2 className="mb-1">{item.title}</H2>

  return (
    <Div className="d-flex align-items-center p-3 border rounded" onClick={() => onSelect && onSelect(item)}>
      {nav ? <Link to={`/user/album/${item.id}`}>{label}</Link> : label}
      {onDelete && <button className="close ml-auto" onClick={() => onDelete(item)}>&times;</button>}
    </Div>
  )
}

export default AlbumRecord