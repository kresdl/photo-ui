import React, { useState, useEffect, useLayoutEffect } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { byTitle } from '../util'
import { useAlbums, useAlbum, usePhotos, useAddPhoto, useRemovePhoto } from '../hooks'
import { useErrorResetBoundary } from 'react-query'

const Organize: React.FC = () => {
  const [albumId, setAlbumId] = useState<number | null>(null)
  const { reset } = useErrorResetBoundary()

  const {
    data: photos,
    msg: photosMsg,
    error: photosErr
  } = usePhotos()

  const {
    data: albums,
    msg: albumsMsg,
    error: albumsErr
  } = useAlbums()

  const {
    data: album,
    msg: albumMsg,
    error: albumErr
  } = useAlbum(albumId)

  const {
    mutate: addPhoto,
    msg: addMsg,
    error: addErr
  } = useAddPhoto()

  const {
    mutate: removePhoto,
    msg: removeMsg,
    error: removeErr
  } = useRemovePhoto()

  useEffect(() => {
    albums?.length && setAlbumId(albums[0].id)
  }, [albums])

  const ready = (photos?.length && album) || null

  return (
    <div className="row">
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        {
          ready && <Photos photos={photos} onSelect={id =>{ reset(); addPhoto(id, albumId!); }} />
        }
        <div className="pt-3">
          {
            [photosMsg, albumsMsg, albumMsg, addMsg, removeMsg,
              albumsErr, photosErr, albumErr, addErr, removeErr]
              .map(msg => msg && <p key={msg}>{msg}</p>)
          }
        </div>
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
              <Photos photos={album?.photos.sort(byTitle)} onSelect={id => removePhoto(id, albumId!)} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Organize