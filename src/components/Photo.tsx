import React from 'react'
import { SavedPhoto } from '../types'

type Props = SavedPhoto & {
  onSelect: (id: number) => void
}

const Photo: React.FC<Props> = ({ onSelect, id, title, comment, url }) =>
  <div onClick={() => onSelect(id)}>
    <div className="d-flex justify-content-between">
      <h5 className="mb-1">{title}</h5>
      <small>{id}</small>
    </div>
    <p className="mb-1">{comment}</p>
    <small>{url}</small>
  </div>

export default Photo