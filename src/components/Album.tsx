import React from 'react'
import { SavedAlbum } from '../types'

type Props = SavedAlbum & {
  onSelect: (id: number) => void
}

const Album: React.FC<Props> = ({ onSelect, id, title }) =>
  <div className="d-flex justify-content-between" onClick={() => onSelect(id)}>
    <h5 className="mb-1">{title}</h5>
    <small>{id}</small>
  </div>

export default Album