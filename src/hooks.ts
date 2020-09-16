/* eslint-disable no-throw-literal */
import { useContext, useCallback, useEffect, useLayoutEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Message, Saved, SavedAlbum, SavedPhoto } from './types'
import {
  downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum,
  removePhotoFromAlbum, deletePhoto, deleteAlbum, uploadAlbum, uploadPhoto
} from './util'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation, queryCache, QueryStatus, QueryConfig, MutationConfig } from 'react-query'

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
      queryCache.clear()
      history.push(redirect)
    }
  }, [path, redirect, history, pathname])
}

type StatusMsg = Partial<Record<QueryStatus, string>>

const useSync = <T>(
  key: string,
  msg: StatusMsg,
  task: () => Promise<T>,
  config?: QueryConfig<T, string>
) => {
  const { status, ...rest } = useQuery(key, task, config)

  return { ...rest, status, msg: msg[status] }
}

const useIndexedSync = <T>(
  key: string,
  index: any,
  msg: StatusMsg,
  task: (id: number) => Promise<T>,
  config?: QueryConfig<T, string>
) => {
  const { status, ...rest } = useQuery(
    [key, index],
    (key: string, index: any) => index && task(index),
    config
  )

  return { ...rest, status, msg: msg[status] }
}

const useMutate = (
  key: string,
  msg: StatusMsg,
  task: (...args: any) => Promise<any>,
  config?: MutationConfig<any, string>
) => {
  const [mutate, { status, ...rest }] = useMutation(
    (args: any[]) => task(...args),
    config
  )

  return {
    ...rest, status,
    mutate: (...args: any[]) => mutate(args),
    msg: msg[status],
  }
}

const addToCache = <T extends Saved>(key: string, item: T) => 
  queryCache.setQueryData(key, (old: T[] | undefined) => old ? [...old, item] : [item])


export const usePhotos = (config?: QueryConfig<SavedPhoto[], string>) =>
  useSync('photos', { loading: 'Downloading photos...' }, downloadPhotos, config)

export const useDeletePhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate('photos', { loading: 'Deleting photo...' }, deletePhoto, 
    {
      onSuccess: () => queryCache.invalidateQueries('photos'),
      ...config      
    }
  )

export const useUploadPhoto = (config?: MutationConfig<SavedPhoto, string>) =>
  useMutate('photos', { loading: 'Uploading photo...' }, uploadPhoto,
    {
      onSuccess: (photo: SavedPhoto) => 
        addToCache('photos', photo),
      ...config
    }
  )

export const useAlbums = (config?: QueryConfig<SavedAlbum[], string>) =>
  useSync('albums', { loading: 'Downloading albums...' }, downloadAlbums, config)

export const useDeleteAlbum = (config?: MutationConfig<unknown, string>) =>
  useMutate('albums', { loading: 'Deleting album...' }, deleteAlbum,
    {
      onSuccess: () => queryCache.invalidateQueries('albums'),
      ...config
    }
  )

export const useUploadAlbum = (config?: MutationConfig<SavedAlbum, string>) =>
  useMutate('albums', { loading: 'Uploading album...' }, uploadAlbum,
    {
      onSuccess: (album: SavedAlbum) => 
        addToCache('albums', album),
      ...config
    }
  )

export const useAlbum = (id: number | null | undefined, config?: QueryConfig<SavedAlbum, string>) =>
  useIndexedSync('album', id, { loading: 'Downloading album...' }, downloadAlbum, config)

export const useAddPhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate('album', { loading: 'Adding photo to album...' }, addPhotoToAlbum,
    {
      onSuccess: () => queryCache.invalidateQueries('album'),
      ...config
    }
  )

export const useRemovePhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate('album', { loading: 'Removing photo from album...' }, removePhotoFromAlbum,
    {
      onSuccess: () => queryCache.invalidateQueries('album'),
      ...config
    }
  )