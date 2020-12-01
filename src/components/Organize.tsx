import React, { useState, useEffect } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { byTitle } from '../lib/util'
import { useAlbums, useAlbum, usePhotos, useAddPhoto, useRemovePhoto } from '../lib/hooks'
import { SavedPhoto } from '../types'

const Organize: React.FC = () => {
  const reset = () => {
    addErr && resetAdd()
    removeErr && resetRemove()
  }

  const [albumId, setAlbumId] = useState<number | undefined>()

  const photos = usePhotos()
  const albums = useAlbums()
  const album = useAlbum(albumId)

  const [
    addPhoto, 
    {
      error: addErr,
      reset: resetAdd
    }
   ] = useAddPhoto()

  const [
    removePhoto,
    {
      error: removeErr,
      reset: resetRemove
    },
   ] = useRemovePhoto()

  useEffect(() => {
    albums.data?.length && setAlbumId(albums.data[0].id)
  }, [albums.data])

  const change = (id: number) => {
    reset()
    setAlbumId(id)
  }

  const add = (photo: SavedPhoto) => {
    reset()
    addPhoto({ photo, albumId: albumId! })
  }

  const remove = (photo: SavedPhoto) => {
    reset()
    removePhoto({ photo, albumId: albumId! })
  }

  const hasPhotos = photos.data?.length || null,
    hasAlbums = albums.data?.length || null,
    albumHasPhotos = album.data?.photos.length || null

  console.log(1)

  return (
    <div className="row">
      <div className="col-lg-6 pb-3 pb-lg-0">
        <h5 className="mb-4">
          <span>Photos</span>
          <small className="float-right text-secondary">
            {
              photos.msg || photos.error || addErr
              || (hasPhotos && 'Add to album') || 'No photos'
            }
          </small>
        </h5>
        <Photos items={photos.data} onSelect={add} disabled={!hasAlbums} />
      </div>
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Album</span>
          <small className="float-right text-secondary">
            {
              albums.msg || albums.error || (!hasAlbums && 'No albums')
            }
          </small>
        </h5>
        {
          hasAlbums &&
          <>
            <div className="mb-3">
              <AlbumSelect albums={albums.data} onChange={change}
                selected={albumId} disabled={!hasPhotos} />
            </div>
            <div className="mb-3">
              {
                hasPhotos &&
                <p>
                  <span>Photos</span>
                  <small className="float-right text-secondary">
                    {
                      album.msg || album.error || removeErr
                      || (albumHasPhotos && 'Remove from album') || 'No photos'
                    }
                  </small>
                </p>
              }
              <div key={albumId}>
                <Photos items={album.data?.photos.sort(byTitle)} onSelect={remove} />
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Organize