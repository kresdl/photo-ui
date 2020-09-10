import React, { useEffect } from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { SavedAlbum } from '../types'
import { useNotify, useAlbums } from '../hooks'
import Message from './Message'

const AlbumEditor: React.FC = () => {
  const { msg, notify } = useNotify(),
    { downloadAlbums, deleteAlbum, albums, setAlbums } = useAlbums(),
    upload = (album: SavedAlbum) => setAlbums([...albums, album])

  useEffect(
    () => void downloadAlbums().catch(notify), 
    [downloadAlbums, notify]
  )

  return (
    <div className="row">
      <div className="col-6">
        <UploadAlbum onUpload={upload}/>
        <Message msg={msg} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Albums</h5>
        <Albums albums={albums} onSelect={deleteAlbum}/>
      </div>
    </div>
  )
}

export default AlbumEditor