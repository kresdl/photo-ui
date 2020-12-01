import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { byTitle } from '../lib/util'
import { usePhotos, useDeletePhoto, useUploadPhoto } from '../lib/hooks'
import firebase from 'firebase/app'
import { SavedPhoto } from '../types'

const PhotoEditor: React.FC = () => {
  const photos = usePhotos()

  const [deletePhoto, { error: deleteErr }] = useDeletePhoto()
  const [uploadPhoto, { error: uploadErr }] = useUploadPhoto()

  const discard = async (item: SavedPhoto) => {
    const path = item.url.match(/appspot.com\/o\/([^/?]*)/)?.[1]
    deletePhoto(item)
    firebase.storage().ref(path).delete()
  }

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
              || (photos.data?.length && 'Delete') || 'No photos'
            }
          </small>
        </h5>
        <Photos items={photos.data?.sort(byTitle)} onSelect={discard} />
      </div>
    </div>
  )
}

export default PhotoEditor