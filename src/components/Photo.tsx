import React from 'react'
import { SavedPhoto } from '../types'

type Props = SavedPhoto & {
  onSelect: (photo: SavedPhoto) => unknown
}

const Photo: React.FC<Props> = ({ onSelect, ...photo }) =>
  <div onClick={() => onSelect(photo)}>
    <div className="d-flex justify-content-between">
      <h5 className="mb-1">{photo.title}</h5>
      <small>{photo.id}</small>
    </div>
    <p className="mb-1">{photo.comment}</p>
    <small>{photo.url}</small>
  </div>

export default Photo