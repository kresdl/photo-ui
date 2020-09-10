import React, { useEffect } from 'react'
import UploadAlbum from './UploadAlbum'
import AlbumEditor from './AlbumEditor'
import { SavedAlbum } from '../types'
import { useNotify, useAlbums } from '../hooks'

const AlbumPanel: React.FC = () => {
  const { notify } = useNotify(),
    { downloadAlbums, deleteAlbum, albums, setAlbums } = useAlbums(),
    upload = (album: SavedAlbum) => setAlbums([...albums, album])

  useEffect(() => void downloadAlbums().catch(notify), [downloadAlbums, notify])

  return (
    <div className="row px-5">
      <div className="col-6">
        <UploadAlbum onUpload={upload}/>
      </div>
      <div className="col-6">
        <AlbumEditor albums={albums} onDelete={deleteAlbum}/>
      </div>
    </div>
  )
}

export default AlbumPanel