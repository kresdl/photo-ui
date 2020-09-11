import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { usePhotos, useDeletePhoto, useUploadPhoto, useNotify } from '../hooks'

const PhotoEditor: React.FC = () => {
  const { msg } = useNotify(),
    { data } = usePhotos(),
    [deletePhoto] = useDeletePhoto(),
    [uploadPhoto] = useUploadPhoto()

  return (
    <div className="row">
      <div className="col-6">
        <UploadPhoto onUpload={uploadPhoto} />
        <p className="pt-3">{msg}</p>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={data} onSelect={deletePhoto} />
      </div>
    </div>
  )
}

export default PhotoEditor