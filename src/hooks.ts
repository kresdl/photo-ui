/* eslint-disable no-throw-literal */
import { useContext, useCallback, useEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Message, Album, Photo, Titled } from './types'
import {
  downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum,
  removePhotoFromAlbum, deletePhoto, deleteAlbum, uploadAlbum, uploadPhoto
} from './util'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation, queryCache } from 'react-query'

const byTitle = (a: Titled, b: Titled) => a.title > b.title ? 1 : -1

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
  const { notify } = useNotify()

  return useQuery('photos', async () => {
    notify('Downloading photos...')
    let photos = await downloadPhotos()
    notify(null)
    return photos.sort(byTitle)
  }, { onError: (err: Message) => notify(err) })
}

export const useDeletePhoto = () => {
  const { notify } = useNotify()

  return useMutation(async (id: number) => {
    notify('Deleting photo...')
    await deletePhoto(id)
    notify(null)
   }, {
    onSuccess: () => queryCache.invalidateQueries('photos'),
    onError: (err: Message) => notify(err) 
  })
}

export const useUploadPhoto = () => {
  const { notify } = useNotify()

  return useMutation(async (photo: Photo) => {
    notify('Uploading photo...')
    await uploadPhoto(photo)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries('photos'),
    onError: (err: Message) => notify(err)
  })
}

export const useAlbums = () => {
  const { notify } = useNotify()

  return useQuery('albums', async () => {
    notify('Downloading albums...')
    let albums = await downloadAlbums()
    notify(null)
    return albums.sort(byTitle)
  }, { onError: (err: Message) => notify(err) })
}

export const useDeleteAlbum = () => {
  const { notify } = useNotify()

  return useMutation(async (id: number) => {
    notify('Deleting album...')
    await deleteAlbum(id)
    notify(null)
   }, {
    onSuccess: () => queryCache.invalidateQueries('albums'),
    onError: (err: Message) => notify(err) 
  })
}

export const useUploadAlbum = () => {
  const { notify } = useNotify()

  return useMutation(async (album: Album) => {
    notify('Uploading album...')
    await uploadAlbum(album)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries('albums'),
    onError: (err: Message) => notify(err)
  })
}

export const useAlbum = (id: number | null) => {
  const { notify } = useNotify()

  return useQuery(['album', id], async (key: string, id: number | null) => {
    if (id) {
      notify('Downloading Album...')
      const dl = await downloadAlbum(id)
      notify(null)
      return dl.photos.sort(byTitle)
    }
  }, { onError: (err: Message) => notify(err) })
}

export const useAddPhoto = () => {
  const { notify } = useNotify()

  return useMutation(async ([photoId, albumId]: [number, number]) => {
    notify('Adding photo to album...')
    await addPhotoToAlbum(photoId, albumId)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries('album'),
    onError: (err: Message) => notify(err) 
  })
}

export const useRemovePhoto = () => {
  const { notify } = useNotify()

  return useMutation(async ([photoId, albumId]: [number, number]) => {
    notify('Removing photo from album...')
    await removePhotoFromAlbum(photoId, albumId)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries('album'),
    onError: (err: Message) => notify(err)
  })
}
