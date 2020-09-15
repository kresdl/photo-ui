import React from 'react'
import { SavedAlbum } from '../types'

const Album: React.FC<SavedAlbum> = ({ id, title }) =>
  <div className="d-flex justify-content-between p-3 border rounded">
    <h5 className="mb-1">{title}</h5>
    <small>{id}</small>
  </div>

export default Album