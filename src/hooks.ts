import { useState, useContext, useCallback } from 'react'
import MessageContext from './components/MessageContext'
import { Message, SavedAlbum, SavedPhoto } from './types'
import { downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum, removePhotoFromAlbum, deletePhoto, deleteAlbum } from './util'

export const useNotify = () => {
  const [msg, setMsg] = useContext(MessageContext)!

  return {
    msg,

    notify: useCallback((msg: Message) => {
      const m = [] as string[]
      setMsg(msg ? m.concat(msg) : m)
    }, [setMsg])
  }
}

export const useAlbum = () => {
  const [album, setAlbum] = useState<SavedAlbum | null>(null)

  return {
    album, setAlbum,

    addPhoto: useCallback((photo: SavedPhoto) => {
      setAlbum(album => album && {
        ...album,
        photos: [...album.photos!, photo]
      })
    }, []),

    removePhoto: useCallback((photo: SavedPhoto) => {
      setAlbum(album => album && {
        ...album,
        photos: album.photos!.filter(p => photo.id !== p.id)
      })
    }, [])
  }
}

export const usePhotos = () => {
  const [photos, setPhotos] = useState<SavedPhoto[]>([])
  const { notify } = useNotify()

  return { 
    photos, setPhotos,

    downloadPhotos: useCallback(async () => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Downloading photos...')
      const dl = await downloadPhotos(token)
      setPhotos(dl)
      notify(null)

    }, [notify, setPhotos]),

    deletePhoto: useCallback(async (photo: SavedPhoto) => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Deleting photo...')

      try {
        await deletePhoto(photo.id, token)
        setPhotos(photos.filter(
          ({ id }) => id !== photo.id
        ))
        notify(null)
      } catch (err) {
        notify(err)
      }
    }, [photos, setPhotos, notify])
  }
}

export const useAlbums = () => {
  const [albums, setAlbums] = useState<SavedAlbum[]>([])
  const { notify } = useNotify()

  return { 
    albums, setAlbums,

    downloadAlbums: useCallback(async () => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Downloading albums...')
      const dl = await downloadAlbums(token)
      setAlbums(dl)
      notify(null)

    }, [notify, setAlbums]),

    deleteAlbum: useCallback(async (album: SavedAlbum) => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Deleting album...')

      try {
        await deleteAlbum(album.id, token)
        setAlbums(albums.filter(
          ({ id }) => id !== album.id
        ))
        notify(null)
      } catch (err) {
        notify(err)
      }
    }, [albums, notify])
  }
}

export const useOrganizer = () => {
  const { downloadPhotos, photos } = usePhotos(),
    { downloadAlbums, albums } = useAlbums(),
    { album, setAlbum, addPhoto, removePhoto } = useAlbum(),
    { notify } = useNotify()

  return {
    photos, albums, album,

    download: useCallback(async () => {
      await downloadPhotos()
      await downloadAlbums()
    }, [downloadPhotos, downloadAlbums]),

    cd: useCallback(async (id: number) => {
      const token = sessionStorage.getItem('token')
      if (!token) return

      notify('Downloading album...')

      try {
        const newAlbum = await downloadAlbum(id, token)
        setAlbum(newAlbum)
        notify(null)
      } catch (err) {
        notify(err)
      }
    }, [notify, setAlbum]),

    add: useCallback(async (photo: SavedPhoto) => {
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
    }, [addPhoto, album, notify]),

    remove: useCallback(async (photo: SavedPhoto) => {
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
    }, [album, notify, removePhoto])
  }
}
