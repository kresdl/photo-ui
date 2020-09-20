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
    error: uploadErr
  } = useUploadPhoto({ throwOnError: true })

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload photo</span>
          <small className="float-right text-secondary">
            {uploadMsg || uploadErr}
          </small>
        </h5>
        <UploadPhoto onUpload={uploadPhoto} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Albums</span>
          <small className="float-right text-secondary">
            {
              loadMsg || deleteMsg || loadErr || deleteErr
              || (photos?.length && 'Delete') || 'No albums'
            }
          </small>
        </h5>
        <Photos items={photos?.sort(byTitle)} onSelect={deletePhoto} />
      </div>
    </div>
  )
}

export default PhotoEditor