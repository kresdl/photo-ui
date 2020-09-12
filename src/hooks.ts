/* eslint-disable no-throw-literal */
import { useContext, useCallback, useEffect, useLayoutEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Message } from './types'
import {
  downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum,
  removePhotoFromAlbum, deletePhoto, deleteAlbum, uploadAlbum, uploadPhoto
} from './util'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation, queryCache } from 'react-query'

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

const useSync = <T>(key: string, msg: string, task: () => Promise<T[]>) => {
  const { notify } = useNotify()

  return useQuery(key, async () => {
    notify(msg)
    let items = await task()
    notify(null)
    return items
  }, { onError: (err: Message) => notify(err) }).data
}

const useIndexedSync = <T>(key: string, index: any, msg: string, task: (id: number) => Promise<T>) => {
  const { notify } = useNotify()

  return useQuery([key, index], async (key: string, index: any) => {
    if (index) {
      notify(msg)
      const dl = await task(index)
      notify(null)
      return dl
    }
  }, { onError: (err: Message) => notify(err) }).data
}

const useMutate = (key: string, msg: string, task: (...args: any[]) => Promise<any>) => {
  const { notify } = useNotify()

  const [mutate] = useMutation(async (args: any[]) => {
    notify(msg)
    await task(...args)
    notify(null)
  }, {
    onSuccess: () => queryCache.invalidateQueries(key),
    onError: (err: Message) => notify(err) 
  })

  return (...args: any[]) => mutate(args)
}

export const usePhotos = () =>
  useSync('photos', 'Downloading photos...', downloadPhotos)

export const useDeletePhoto = () =>   
  useMutate('photos', 'Deleting photo...', deletePhoto)

export const useUploadPhoto = () =>
  useMutate('photos', 'Uploading photo...', uploadPhoto)

export const useAlbums = () => 
  useSync('albums', 'Downloading albums...', downloadAlbums)

export const useDeleteAlbum = () =>
  useMutate('albums', 'Deleting album...', deleteAlbum)

export const useUploadAlbum = () =>
  useMutate('albums', 'Uploading album...', uploadAlbum)

export const useAlbum = (id: number | null) => 
  useIndexedSync('album', id, 'Downloading Album...', downloadAlbum)

export const useAddPhoto = () => 
  useMutate('album', 'Adding photo to album...', addPhotoToAlbum)

export const useRemovePhoto = () => 
  useMutate('album', 'Removing photo from album...', removePhotoFromAlbum)