import React, { useState, useEffect } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { byTitle } from '../util'
import { useAlbums, useAlbum, usePhotos, useAddPhoto, useRemovePhoto } from '../hooks'

const Organize: React.FC = () => {
  const reset = () => {
    addErr && resetAdd()
    removeErr && resetRemove()
  }

  const [albumId, setAlbumId] = useState<number | undefined>()

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
    error: addErr,
    reset: resetAdd
  } = useAddPhoto()

  const {
    mutate: removePhoto,
    msg: removeMsg,
    error: removeErr,
    reset: resetRemove
  } = useRemovePhoto()

  useEffect(() => {
    albums?.length && setAlbumId(albums[0].id)
  }, [albums])

  const change = (id: number) => {
    reset()
    setAlbumId(id)
  }

  const add = (id: number) => {
    reset()
    addPhoto(id, albumId!)
  }

  const remove = (id: number) => {
    reset()
    removePhoto(id, albumId!)
  }

  const hasPhotos = photos?.length || null,
    hasAlbums = albums?.length || null

  return (
    <div className="row">
      <div className="col-lg-6 pb-3 pb-lg-0">
        {
          hasPhotos
          ? <>
              <h5 className="mb-4">
                <span>Photos</span><small className="float-right">{hasAlbums && 'Add to album'}</small>
              </h5>
              <Photos items={photos} onSelect={add} disabled={!hasAlbums} />
            </>
          : <h5 className="mb-4">No photos</h5>
        }
        <div className="pt-3">
          {
            [photosMsg, albumsMsg, albumMsg, addMsg, removeMsg,
              albumsErr, photosErr, albumErr, addErr, removeErr]
              .map(msg => msg && <p key={msg}>{msg}</p>)
          }
        </div>
      </div>
      <div className="col-lg-6">
        {
          hasAlbums
          ? <>
              <h5 className="mb-4">Album</h5>
              <div className="mb-3">
                <AlbumSelect albums={albums} onChange={change} selected={albumId} disabled={!hasPhotos} />
              </div>
              <div className="mb-3">
                {
                  hasPhotos &&
                    (
                      album?.photos.length
                      ? <>
                          <p><span>Photos</span><small className="float-right">Remove from album</small></p>
                          <div key={albumId}>
                            <Photos items={album?.photos.sort(byTitle)} onSelect={remove} />
                          </div>
                        </>
                      : <span>No photos</span>
                    )
                }
              </div>
            </>
          : <h5 className="mb-4">No albums</h5>
        }
      </div>
    </div>
  )
}

export default Organize