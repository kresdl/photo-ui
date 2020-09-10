import React, { useEffect } from 'react'
import UploadPhoto from './UploadPhoto'
import PhotoEditor from './PhotoEditor'
import { usePhotos, useNotify } from '../hooks'
import { SavedPhoto } from '../types'

const PhotoPanel: React.FC = () => {
  const { notify } = useNotify(),
    { downloadPhotos, deletePhoto, photos, setPhotos } = usePhotos(),
    upload = (photo: SavedPhoto) => setPhotos([...photos, photo])

  useEffect(() => void downloadPhotos().catch(notify), [downloadPhotos, notify])

  return (
    <div className="row px-5">
      <div className="col-6">
        <UploadPhoto onUpload={upload}/>
      </div>
      <div className="col-6">
        <PhotoEditor photos={photos} onDelete={deletePhoto}/>
      </div>
    </div>
  )
}

export default PhotoPanel