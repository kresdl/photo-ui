import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from '../util'
import { useAlbums, useDeleteAlbum, useUploadAlbum } from '../hooks'

const AlbumEditor: React.FC = () => {
  const {
    data: albums,
    msg: loadMsg,
    error: loadErr
  } = useAlbums()

  const {
    mutate: deleteAlbum,
    msg: deleteMsg,
    error: deleteErr
  } = useDeleteAlbum()

  const {
    mutate: uploadAlbum,
    msg: uploadMsg,
    error: uploadErr
  } = useUploadAlbum()

  return (
    <div className="row">
      <div className="col-6">
        <UploadAlbum onUpload={uploadAlbum} />
        <div className="pt-3">
          {
            [loadMsg, deleteMsg, uploadMsg,
              loadErr, deleteErr, uploadErr]
              .map(msg => msg && <p key={msg}>{msg}</p>)
          }
        </div>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Albums</h5>
        <Albums albums={albums?.sort(byTitle)} onSelect={deleteAlbum} />
      </div>
    </div>
  )
}

export default AlbumEditor