import React from 'react'
import { SavedAlbum } from '../types'

type Props = SavedAlbum & {
  onSelect: (album: SavedAlbum) => unknown
}

const Album: React.FC<Props> = ({ onSelect, ...album }) =>
  <div className="d-flex justify-content-between" onClick={() => onSelect(album)}>
    <h5 className="mb-1">{album.title}</h5>
    <small>{album.id}</small>
  </div>

export default Album