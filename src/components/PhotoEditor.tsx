import React from 'react'
import UploadPhoto from './UploadPhoto'
import Photos from './Photos'
import { byTitle } from '../util'
import { usePhotos, useDeletePhoto, useUploadPhoto } from '../hooks'
import { Photo } from '../types'

const PhotoEditor: React.FC = () => {
  const reset = () => deleteErr && resetDelete()

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
    error: uploadErr
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
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload photo</span>
          <small className="float-right text-secondary">
            {
              uploadMsg || uploadErr
            }
          </small>
        </h5>
        <UploadPhoto onUpload={upload} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          {
            <>
              <span>Albums</span>
              <small className="float-right text-secondary">
                {
                  loadMsg || deleteMsg || loadErr || deleteErr
                  || (photos?.length && 'Delete') || 'No albums'
                }
              </small>
            </>
          }
        </h5>
        <Photos items={photos?.sort(byTitle)} onSelect={discard} />
      </div>
    </div>
  )
}

export default PhotoEditor