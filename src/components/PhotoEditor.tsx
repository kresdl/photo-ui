import React, { useEffect, useCallback } from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { usePhotos, useNotify } from '../hooks'
import Message from './Message'
import { SavedPhoto } from '../types'

const PhotoEditor: React.FC = () => {
  const { msg, notify } = useNotify()
  const { downloadPhotos, deletePhoto, uploadPhoto, photos } = usePhotos()

  const discard = async ({ id }: SavedPhoto) => {
    notify('Deleting photo...')

    try {
      await deletePhoto(id)
      notify('Photo deleted!')
    } catch (err) {
      notify(err)
    }
  }

  const mount = useCallback(async () => {
    notify('Downloading photos...')

    try {
      await downloadPhotos()
      notify(null)
    } catch (err) {
      notify(err)
    }
  }, [notify, downloadPhotos])

  useEffect(() => void mount(), [mount])

  return (
    <div className="row">
      <div className="col-6">
        <UploadPhoto onUpload={uploadPhoto} />
        <Message msg={msg} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos} onSelect={discard} />
      </div>
    </div>
  )
}

export default PhotoEditor