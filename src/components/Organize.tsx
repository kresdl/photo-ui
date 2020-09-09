import React, { useEffect, useState, useCallback } from 'react'
import Photos from './Photos'
import Albums from './Albums'
import { useNotify, useAlbum } from '../hooks'
import { downloadPhotos, downloadAlbums, downloadAlbum, addPhotoToAlbum, removePhotoFromAlbum } from '../util'
import { SavedPhoto, SavedAlbum } from '../types'

const Organize: React.FC = () => {
  const [photos, setPhotos] = useState<SavedPhoto[]>([]),
    [albums, setAlbums] = useState<SavedAlbum[]>([]),
    { album, setAlbum, addPhoto, removePhoto } = useAlbum(),
    { notify } = useNotify(),

    start = useCallback(async () => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Downloading...')

      try {
        const photos = await downloadPhotos(token)
        const albums = await downloadAlbums(token)

        setPhotos(photos)
        setAlbums(albums)

        const current = await downloadAlbum(albums[0].id, token)
        setAlbum(current)
        notify(null)
      } catch (err) {
        notify(err)
      }
    }, [notify, setAlbum]),

    cd = async (id: number) => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Downloading...')

      try {
        const newAlbum = await downloadAlbum(id, token)
        setAlbum(newAlbum)
        notify(null)
      } catch (err) {
        notify(err)
      }
    },

    add = async (photo: SavedPhoto) => {
      const token = sessionStorage.getItem('token')
      if (!token || !album) return

      notify('Adding photo...')

      try {
        await addPhotoToAlbum(photo.id, album.id, token)
        addPhoto(photo)
        notify(null)
      } catch (err) {
        notify(err)
      }
    },

    remove = async (photo: SavedPhoto) => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Removing photo...')

      try {
        await removePhotoFromAlbum(album!.id, photo.id, token)
        removePhoto(photo)
        notify(null)
      } catch (err) {
        notify(err)
      }
    }

  useEffect(() => void start(), [start])

  if (!photos.length && !albums.length && !album) return null

  return (
    <div className="row px-5">
      <div className="col-6">
        <h5 className="mb-3">Photos</h5>
        <Photos photos={photos} onSelect={add} />
      </div>
      <div className="col-6">
        <h5 className="mb-3">Album</h5>
        <div className="mb-3">
          <Albums albums={albums} onChange={cd} />
        </div>
        <Photos photos={album?.photos} onSelect={remove} />
      </div>
    </div>
  )
}

export default Organize