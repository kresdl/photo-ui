import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from '../util'
import { useAlbums, useDeleteAlbum, useUploadAlbum } from '../hooks'

const AlbumEditor: React.FC = () => {
  const albums = useAlbums()

  const [deleteAlbum, { error: deleteErr }] = useDeleteAlbum()
  const [uploadAlbum, { error: uploadErr }] = useUploadAlbum()

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload album</span>
          <small className="float-right text-secondary">
            {uploadErr}
          </small>
        </h5>
        <UploadAlbum onUpload={uploadAlbum} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Albums</span>
          <small className="float-right text-secondary">
            {
              albums.msg || albums.error || deleteErr
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