import React from 'react'
import { SavedPhoto } from '../types'

type Props = {
  photos?: SavedPhoto[],
  onSelect: (photo: SavedPhoto) => void
}

const Photos: React.FC<Props> = ({ photos, onSelect }) =>
  <ul className="list-group">
    {
      photos?.map(photo =>
        <li className="list-group-item list-group-item-action" key={photo.id} onClick={() => onSelect(photo)}>
          <div className="d-flex justify-content-between">
            <h5 className="mb-1">{photo.title}</h5>
            <small>{photo.id}</small>
          </div>
          <p className="mb-1">{photo.comment}</p>
          <small>{photo.url}</small>
        </li>
      )
    }
  </ul>

export default Photos