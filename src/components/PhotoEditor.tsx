import React, { useEffect } from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { usePhotos, useNotify } from '../hooks'
import { SavedPhoto } from '../types'
import Message from './Message'

const PhotoEditor: React.FC = () => {
  const { msg, notify } = useNotify(),
    { downloadPhotos, deletePhoto, photos, setPhotos } = usePhotos(),
    upload = (photo: SavedPhoto) => setPhotos([...photos, photo])

  useEffect(
    () => void downloadPhotos().catch(notify), 
    [downloadPhotos, notify]
  )

  return (
    <div className="row">
      <div className="col-6">
        <UploadPhoto onUpload={upload}/>
        <Message msg={msg} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos} onSelect={deletePhoto}/>
      </div>
    </div>
  )
}

export default PhotoEditor