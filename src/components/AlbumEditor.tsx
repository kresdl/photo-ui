import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from '../util'
import { useAlbums, useDeleteAlbum, useUploadAlbum } from '../hooks'

const AlbumEditor: React.FC = () => {
  const albums = useAlbums()

  const {
    mutate: deleteAlbum,
    msg: deleteMsg,
    error: deleteErr,
  } = useDeleteAlbum()

  const {
    mutate: uploadAlbum,
    msg: uploadMsg,
    error: uploadErr
  } = useUploadAlbum({ throwOnError: true })

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload album</span>
          <small className="float-right text-secondary">
            {uploadMsg || uploadErr}
          </small>
        </h5>
        <UploadAlbum onUpload={uploadAlbum} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Albums</span>
          <small className="float-right text-secondary">
            {
              albums.msg || deleteMsg || albums.error || deleteErr
              || (albums.data?.length && 'Delete') || 'No albums'
            }
          </small>
        </h5>
        <Albums items={albums.data?.sort(byTitle)} onSelect={deleteAlbum} />
      </div>
    </div>
  )
}

export default AlbumEditor