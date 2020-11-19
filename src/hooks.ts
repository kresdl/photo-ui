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
import AuthContext from './components/AuthContext'

export const useAuth = () => useContext(AuthContext)!

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
    { pathname } = useLocation(),
    [,setAuth] = useAuth()

  useEffect(() => {
    if (pathname === path) {
      sessionStorage.removeItem('token')
      setAuth(null)
      queryCache.clear()
      history.push(redirect)
    }
  }, [setAuth, path, redirect, history, pathname])
}

type StatusMsg = Partial<Record<QueryStatus, string>>

const useSync = <T>(
  key: string,
  task: () => Promise<T>,
  msg: StatusMsg,
  config?: QueryConfig<T, string>
) => {
  const { status, ...rest } = useQuery(key, task, config)

  return { ...rest, status, msg: msg[status] }
}

const useIndexedSync = <T>(
  key: string,
  index: any,
  task: (id: number) => Promise<T>,
  msg: StatusMsg,
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
  task: (...args: any) => Promise<any>,
  msg: StatusMsg,
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

const appendToCache = <T extends Saved>(key: string, item: T) => 
  queryCache.setQueryData(key, (old: T[] | undefined) => old ? [...old, item] : [item])


export const usePhotos = (config?: QueryConfig<SavedPhoto[], string>) =>
  useSync('photos', downloadPhotos, { loading: 'Downloading photos...' }, config)

export const useAlbums = (config?: QueryConfig<SavedAlbum[], string>) =>
  useSync('albums', downloadAlbums, { loading: 'Downloading albums...' }, config)

export const useAlbum = (id: number | undefined, config?: QueryConfig<SavedAlbum, string>) =>
  useIndexedSync('album', id, downloadAlbum, { loading: 'Downloading album...' }, config)

export const useAddPhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate(addPhotoToAlbum, { loading: 'Adding photo to album...' },
    {
      onSuccess: () => queryCache.invalidateQueries('album'),
      ...config
    }
  )

export const useRemovePhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate(removePhotoFromAlbum, { loading: 'Removing photo from album...' },
    {
      onSuccess: () => queryCache.invalidateQueries('album'),
      ...config
    }
  )

export const useDeleteAlbum = (config?: MutationConfig<unknown, string>) =>
  useMutate(deleteAlbum, { loading: 'Deleting album...' },
    {
      onSuccess: () => queryCache.invalidateQueries('albums'),
      ...config
    }
  )

export const useUploadAlbum = (config?: MutationConfig<SavedAlbum, string>) =>
  useMutate(uploadAlbum, { loading: 'Uploading album...' },
    {
      onSuccess: (album: SavedAlbum) => appendToCache('albums', album),
      ...config
    }
  )

export const useDeletePhoto = (config?: MutationConfig<unknown, string>) =>
  useMutate(deletePhoto, { loading: 'Deleting photo...' },
    {
      onSuccess: () => queryCache.invalidateQueries('photos'),
      ...config      
    }
  )

export const useUploadPhoto = (config?: MutationConfig<SavedPhoto, string>) =>
  useMutate(uploadPhoto, { loading: 'Uploading photo...' },
    {
      onSuccess: (photo: SavedPhoto) => appendToCache('photos', photo),
      ...config
    }
  )
