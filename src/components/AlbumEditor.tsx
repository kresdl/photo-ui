import React from 'react'
import Albums from './Albums'
import { SavedAlbum } from '../types'

type Props = {
  albums: SavedAlbum[]
  onDelete: (photo: SavedAlbum) => void
}

const AlbumEditor: React.FC<Props> = ({ albums, onDelete }) => {
  if (!albums.length) return null

  return (
    <div>
      <h5 className="mb-3">Albums</h5>
      <Albums albums={albums} onSelect={onDelete} />
    </div>
  )
}

export default AlbumEditor