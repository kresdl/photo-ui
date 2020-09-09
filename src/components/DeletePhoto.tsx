import React, { useEffect } from 'react'
import Photos from './Photos'
import { usePhotos, useNotify } from '../hooks'

const DeletePhoto: React.FC = () => {
  const { downloadPhotos, photos, deletePhoto } = usePhotos()
  const { notify } = useNotify()
  
  useEffect(() => void downloadPhotos().catch(notify), [downloadPhotos, notify])

  if (!photos.length) return null

  return (
    <div className="col-6">
      <h5 className="mb-3">Delete photo</h5>
      <Photos photos={photos} onSelect={deletePhoto} />
    </div>
  )
}

export default DeletePhoto