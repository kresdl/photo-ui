import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { byTitle } from '../util'
import { usePhotos, useDeletePhoto, useUploadPhoto } from '../hooks'

const PhotoEditor: React.FC = () => {
  const {
    data: photos,
    msg: loadMsg,
    error: loadErr
  } = usePhotos()

  const {
    mutate: deletePhoto,
    msg: deleteMsg,
    error: deleteErr,
  } = useDeletePhoto()

  const {
    mutate: uploadPhoto,
    msg: uploadMsg,
    error: uploadErr,
  } = useUploadPhoto()

  return (
    <div className="row">
      <div className="col-6">
        <UploadPhoto onUpload={uploadPhoto} />
        <div className="pt-3">
          {
            [loadMsg, deleteMsg, uploadMsg,
              loadErr, deleteErr, uploadErr]
              .map(msg => msg && <p key={msg}>{msg}</p>)
          }
        </div>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos?.sort(byTitle)} onSelect={deletePhoto} />
      </div>
    </div>
  )
}

export default PhotoEditor