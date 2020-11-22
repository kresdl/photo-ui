import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { byTitle } from '../util'
import { usePhotos, useDeletePhoto, useUploadPhoto } from '../hooks'

const PhotoEditor: React.FC = () => {
  const photos = usePhotos()

  const [deletePhoto, { error: deleteErr }] = useDeletePhoto()
  const [uploadPhoto, { error: uploadErr }] = useUploadPhoto()

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload photo</span>
          <small className="float-right text-secondary">
            {uploadErr}
          </small>
        </h5>
        <UploadPhoto onUpload={uploadPhoto} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Photos</span>
          <small className="float-right text-secondary">
            {
              photos.msg || photos.error || deleteErr
              || (photos.data?.length && 'Delete') || 'No albums'
            }
          </small>
        </h5>
        <Photos items={photos.data?.sort(byTitle)} onSelect={deletePhoto} />
      </div>
    </div>
  )
}

export default PhotoEditor