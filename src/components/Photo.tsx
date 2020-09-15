import React from 'react'
import { SavedPhoto } from '../types'

const Photo: React.FC<SavedPhoto> = ({ id, title, url, comment }) =>
  <div>
    <div className="d-flex justify-content-between">
      <h5 className="mb-1">{title}</h5>
      <small>{id}</small>
    </div>
    <p style={{ fontSize: '1.1rem' }} className="mb-1 lead">{comment}</p>
    <small>{url}</small>
  </div>

export default Photo