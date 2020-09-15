import React from 'react'
import { SavedPhoto } from '../types'

type Props = SavedPhoto & {
  onSelect: (id: number) => unknown
}

const Photo: React.FC<Props> = ({ onSelect, id, title, url, comment }) =>
  <div className="text-light" onClick={() => onSelect(id)}>
    <div className="d-flex justify-content-between">
      <h5 className="mb-1">{title}</h5>
      <small>{id}</small>
    </div>
    <p style={{ fontSize: '1.1rem' }} className="mb-1 lead">{comment}</p>
    <small>{url}</small>
  </div>

export default Photo