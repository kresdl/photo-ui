/* eslint-disable no-throw-literal */
import { useContext, useCallback, useEffect, useLayoutEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Message, Titled } from './types'
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

export const useRouteMessage = () => {
  const { pathname, state } = useLocation<Message>()
  const { msg, notify } = useNotify()

  useLayoutEffect(
    () => notify(state),
    [pathname, state, notify]
  )

  return msg
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

const usePeek = <T>(key: string, msg: string, task: () => Promise<T[]>) => {
  const { notify } = useNotify()

  return useQuery(key, async () => {
    notify(msg)
    let items = await task()
    notify(null)
    return items
  }, { onError: (err: Message) => notify(err) })
}

const useIndexedPeek = <T>(key: string, index: any, msg: string, task: (id: number) => Promise<T>) => {
  const { notify } = useNotify()

  return useQuery([key, index], async (key: string, index: any) => {
    if (index) {
      notify(msg)
      const dl = await task(index)
      notify(null)
      return dl
    }
  }, { onError: (err: Message) => notify(err) })
}

const usePoke = (key: string, msg: string, task: (...args: any) => Promise<any>) => {
  const { notify } = useNotify()

  return useMutation(async ([...args]: any) => {
    notify(msg)
    await task(...args)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries(key),
    onError: (err: Message) => notify(err) 
  })
}

export const usePhotos = () =>
  usePeek('photos', 'Downloading photos...', downloadPhotos).data

export const useDeletePhoto = () =>   
  usePoke('photos', 'Deleting photo...', deletePhoto)[0]

export const useUploadPhoto = () =>
  usePoke('photos', 'Uploading photo...', uploadPhoto)[0]

export const useAlbums = () => 
  usePeek('albums', 'Downloading albums...', downloadAlbums).data

export const useDeleteAlbum = () =>
  usePoke('albums', 'Deleting album...', deleteAlbum)[0]

export const useUploadAlbum = () =>
  usePoke('albums', 'Uploading album...', uploadAlbum)[0]

export const useAlbum = (id: number | null) => 
  useIndexedPeek('album', id, 'Downloading Album...', downloadAlbum).data

export const useAddPhoto = () => 
  usePoke('album', 'Adding photo to album...', addPhotoToAlbum)[0]

export const useRemovePhoto = () => 
  usePoke('album', 'Removing photo from album...', removePhotoFromAlbum)[0]