import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { byTitle } from '../util'
import { usePhotos, useDeletePhoto, useUploadPhoto } from '../hooks'
import { Photo } from '../types'

const PhotoEditor: React.FC = () => {
  const reset = () => {
    uploadErr && resetUpload()
    deleteErr && resetDelete()
  }

  const {
    data: photos,
    msg: loadMsg,
    error: loadErr
  } = usePhotos()

  const {
    mutate: deletePhoto,
    msg: deleteMsg,
    error: deleteErr,
    reset: resetDelete
  } = useDeletePhoto()

  const {
    mutate: uploadPhoto,
    msg: uploadMsg,
    error: uploadErr,
    reset: resetUpload
  } = useUploadPhoto({ throwOnError: true })

  const upload = (album: Photo) => {
    reset()
    return uploadPhoto(album)
  }

  const discard = (id: number) => {
    reset()
    deletePhoto(id)
  }

  return (
    <div className="row">
      <div className="col-6">
        <UploadPhoto onUpload={upload} />
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
        <Photos items={photos?.sort(byTitle)} onSelect={discard} />
      </div>
    </div>
  )
}

export default PhotoEditor