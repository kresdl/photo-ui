import React, { useEffect } from 'react'
import Photos from './Photos'
import Album from './AlbumSelect'
import { useOrganizer, useNotify } from '../hooks'

const Organize: React.FC = () => {
  const { download, photos, albums, album, cd, add, remove } = useOrganizer()
  const { notify } = useNotify()

  useEffect(
    () => void download().catch(notify), 
    [download, notify]
  )

  useEffect(
    () => void (albums.length && cd(albums[0].id).catch(notify)), 
    [albums, cd, notify]
  )

  if (!photos.length || !albums.length || !album) return null

  return (
    <div className="row px-5">
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos} onSelect={add} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Album</h5>
        <div className="mb-3">
          <Album albums={albums} onChange={cd} />
        </div>
        <Photos photos={album.photos} onSelect={remove} />
      </div>
    </div>
  )
}

export default Organize