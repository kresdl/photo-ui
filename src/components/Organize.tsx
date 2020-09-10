import React, { useEffect } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { useOrganizer, useNotify } from '../hooks'
import Message from './Message'

const Organize: React.FC = () => {
  const { download, photos, albums, album, cd, add, remove } = useOrganizer()
  const { msg, notify } = useNotify()

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
    <div className="row">
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos} onSelect={add} />
        <Message className="pt-3" msg={msg} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Album</h5>
        <div className="mb-3">
          <AlbumSelect albums={albums} onChange={cd} />
        </div>
        <div key={album.id}>
          <Photos photos={album.photos} onSelect={remove} />
        </div>
      </div>
    </div>
  )
}

export default Organize