import React from 'react'
import Photos from './Photos'
import { SavedPhoto } from '../types'

type Props = {
  photos: SavedPhoto[],
  onDelete: (photo: SavedPhoto) => void
}

const PhotoEditor: React.FC<Props> = ({ photos, onDelete }) => {  
  if (!photos.length) return null

  return (
    <div>
      <h5 className="mb-3">Photos</h5>
      <Photos photos={photos} onSelect={onDelete} />
    </div>
  )
}

export default PhotoEditor