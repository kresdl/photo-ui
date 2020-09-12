import React, { useState, useEffect } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { useAlbums, useAlbum, usePhotos, useAddPhoto, useRemovePhoto, useNotify } from '../hooks'

const Organize: React.FC = () => {
  const { msg } = useNotify()
  const [albumId, setAlbumId] = useState<number | null>(null)

  const photos = usePhotos(),
    albums = useAlbums(),
    album = useAlbum(albumId),
    addPhoto = useAddPhoto(),
    removePhoto = useRemovePhoto()

  useEffect(() => {
    albums?.length && setAlbumId(albums[0].id)
  }, [albums])

  const ready = (albums?.length && photos?.length && album) || null

  return (
    <div className="row">
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        {
          ready && <Photos photos={photos} onSelect={id => addPhoto([id, albumId!])} />
        }
        <p className="pt-3">{msg}</p>
      </div>
      <div className="col-6">
        <h5 className="mb-3">Album</h5>
        {
          ready &&
          <>
            <div className="mb-3">
              <AlbumSelect albums={albums!} onChange={setAlbumId} />
            </div>
            <div key={albumId}>
              <Photos photos={album!.photos} onSelect={id => removePhoto([id, albumId!])} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Organize