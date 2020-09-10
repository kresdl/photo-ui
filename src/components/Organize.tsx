import React, { useEffect, useCallback } from 'react'
import Photos from './Photos'
import AlbumSelect from './AlbumSelect'
import { useOrganizer, useNotify } from '../hooks'
import Message from './Message'
import { SavedPhoto } from '../types'

const Organize: React.FC = () => {
  const { downloadPhotos, downloadAlbums, photos, albums, album, cd, add, remove } = useOrganizer()
  const { msg, notify } = useNotify()

  const mount = useCallback(async () => {
    notify('Downloading photos...')

    try {
      await downloadPhotos()
      notify('Downloading albums...')
      const temp = await downloadAlbums()
      notify('Downloading album...')
      await cd(temp[0].id)
      notify(null)
    } catch (err) {
      notify(err)
    }
  }, [cd, notify, downloadPhotos, downloadAlbums])

  const changeAlbum = async (id: number) => {
    notify('Downloading album...')

    try {
      await cd(id)
      notify(null)
    } catch (err) {
      notify(err)
    }
  }

  const addPhoto = async (photo: SavedPhoto) => {
    notify('Adding photo to album...')

    try {
      await add(photo)
      notify(null)
    } catch (err) {
      notify(err)
    }
  }

  const removePhoto = async (photo: SavedPhoto) => {
    notify('Removing photo from album...')

    try {
      await remove(photo.id)
      notify(null)
    } catch (err) {
      notify(err)
    }
  }

  useEffect(() => void mount(), [mount])

  return albums.length && photos.length && album
    ?
      <div className="row">
        <div className="col-6">
          <h5 className="mb-3">Photos</h5>
          <Photos photos={photos} onSelect={addPhoto} />
          <Message className="pt-3" msg={msg} />
        </div>
        <div className="col-6">
          <h5 className="mb-3">Album</h5>
          <div className="mb-3">
            <AlbumSelect albums={albums} onChange={changeAlbum} />
          </div>
          <div key={album.id}>
            <Photos photos={album.photos} onSelect={removePhoto} />
          </div>
        </div>
      </div>
    : <Message className="pt-3" msg={msg} />
}

export default Organize