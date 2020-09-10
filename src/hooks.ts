/* eslint-disable no-throw-literal */
import { useState, useContext, useCallback, useEffect, useLayoutEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Message, SavedAlbum, SavedPhoto, Album, Photo, Title } from './types'
import { downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum, 
  removePhotoFromAlbum, deletePhoto, deleteAlbum, uploadAlbum, uploadPhoto } from './util'
import { useHistory, useLocation } from 'react-router-dom'

const byTitle = (a: Title, b: Title) => a.title > b.title ? 1 : -1

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

export const useRouteMessage = () => {
  const { pathname, state } = useLocation<Message>()
  const { notify } = useNotify()

  useLayoutEffect(
    () => notify(state),
    [pathname, state, notify]
  )
}

export const useLogout = (path: string, redirect: string) => {
  const history = useHistory(),
    { pathname } = useLocation()

  useEffect(() => {
    if (pathname === path) {
      sessionStorage.removeItem('token')
      history.push(redirect)
    }
  }, [path, redirect, history, pathname])
}

export const usePhotos = () => {
  const [photos, setPhotos] = useState<SavedPhoto[]>([])

  return {
    photos, setPhotos,

    downloadPhotos: useCallback(async () => {
      let dl = await downloadPhotos()
      dl = dl.sort(byTitle)
      setPhotos(dl)
      return dl
    }, [setPhotos]),

    deletePhoto: useCallback(async (id: number) => {
      await deletePhoto(id)
      setPhotos(photos.filter(
        photo => photo.id !== id
      ))
    }, [photos, setPhotos]),

    uploadPhoto: useCallback(async (photo: Photo) => {
      const saved = await uploadPhoto(photo) as SavedPhoto
      setPhotos([...photos, saved].sort(byTitle))
    }, [photos])
  }
}

export const useAlbums = () => {
  const [albums, setAlbums] = useState<SavedAlbum[]>([])

  return {
    albums, setAlbums,

    downloadAlbums: useCallback(async () => {
      const dl = await downloadAlbums()
      setAlbums(dl.sort(byTitle))
      return dl
    }, [setAlbums]),

    deleteAlbum: useCallback(async (id: number) => {
      await deleteAlbum(id)
      setAlbums(albums.filter(
        album => album.id !== id
      ))
    }, [albums]),

    uploadAlbum: useCallback(async (album: Album) => {
      const saved = await uploadAlbum(album) as SavedAlbum
      setAlbums([...albums, saved].sort(byTitle))
    }, [albums])
  }
}

export const useAlbum = () => {
  const [album, setAlbum] = useState<SavedAlbum | null>(null)

  return {
    album, setAlbum,

    addPhoto: useCallback((photo: SavedPhoto) => {
      setAlbum(album => album && {
        ...album,
        photos: [...album.photos!, photo].sort(byTitle)
      })
    }, []),

    removePhoto: useCallback((id: number) => {
      setAlbum(album => album && {
        ...album,
        photos: album.photos!.filter(photo => photo.id !== id)
      })
    }, [])
  }
}

export const useOrganizer = () => {
  const { downloadPhotos, photos } = usePhotos(),
    { downloadAlbums, albums } = useAlbums(),
    { album, setAlbum, addPhoto, removePhoto } = useAlbum()

  return {
    photos, albums, album,
    downloadPhotos, downloadAlbums,

    cd: useCallback(async (id: number) => {
      setAlbum(await downloadAlbum(id))
    }, [setAlbum]),

    add: useCallback(async (photo: SavedPhoto) => {
      await addPhotoToAlbum(photo.id, album!.id)
      addPhoto(photo)
    }, [addPhoto, album]),

    remove: useCallback(async (id: number) => {
      await removePhotoFromAlbum(album!.id, id)
      removePhoto(id)
    }, [album, removePhoto])
  }
}
