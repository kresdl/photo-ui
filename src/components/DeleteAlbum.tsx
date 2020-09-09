import React, { useEffect } from 'react'
import Albums from './Albums'
import { useAlbums, useNotify } from '../hooks'

const DeleteAlbum: React.FC = () => {
  const { downloadAlbums, albums, deleteAlbum } = useAlbums()
  const { notify } = useNotify()
  
  useEffect(() => void downloadAlbums().catch(notify), [downloadAlbums, notify])

  if (!albums.length) return null

  return (
    <div className="col-6">
      <h5 className="mb-3">Delete album</h5>
      <Albums albums={albums} onSelect={deleteAlbum} />
    </div>
  )
}

export default DeleteAlbum