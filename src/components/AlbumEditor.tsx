import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { useAlbums, useDeleteAlbum, useNotify, useUploadAlbum } from '../hooks'

const AlbumEditor: React.FC = () => {
  const { msg } = useNotify(),
    { data } = useAlbums(),
    [deleteAlbum] = useDeleteAlbum(),
    [uploadAlbum] = useUploadAlbum()

  return (
    <div className="row">
      <div className="col-6">
        <UploadAlbum onUpload={uploadAlbum} />
        <p className="pt-3">{msg}</p>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Albums</h5>
        <Albums albums={data} onSelect={deleteAlbum} />
      </div>
    </div>
  )
}

export default AlbumEditor