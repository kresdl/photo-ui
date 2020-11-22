/* eslint-disable no-throw-literal */
import { useContext, useCallback, useEffect, useLayoutEffect } from 'react'
import MessageContext from './components/MessageContext'
import { Assignment, Message, Saved, SavedAlbum, SavedPhoto } from './types'
import {
  downloadAlbum, downloadPhotos, downloadAlbums, addPhotoToAlbum,
  removePhotoFromAlbum, deletePhoto, deleteAlbum, uploadAlbum, uploadPhoto
} from './util'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery, useMutation, queryCache, QueryStatus, QueryConfig, MutationConfig } from 'react-query'
import AuthContext from './components/AuthContext'
import update from 'immutability-helper'

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
    [, setAuth] = useAuth()

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

export const usePhotos = (config?: QueryConfig<SavedPhoto[], string>) =>
  useSync('photos', downloadPhotos, { loading: 'Downloading photos...' }, config)

export const useAlbums = (config?: QueryConfig<SavedAlbum[], string>) =>
  useSync('albums', downloadAlbums, { loading: 'Downloading albums...' }, config)

export const useAlbum = (id: number | undefined, config?: QueryConfig<SavedAlbum, string>) =>
  useIndexedSync('album', id, downloadAlbum, { loading: 'Downloading album...' }, config)

export const useUploadPhoto = () =>
  useMutation(uploadPhoto, eagerUpload('photos'))

export const useUploadAlbum = () =>
  useMutation(uploadAlbum, eagerUpload('albums'))

export const useDeletePhoto = () =>
  useMutation(
    (photo) => deletePhoto(photo.id), 
    optimisticDelete('photos')
  )

export const useDeleteAlbum = () =>
  useMutation(
    (album) => deleteAlbum(album.id),
    optimisticDelete('albums')
  )

export const useAddPhoto = () =>
  useMutation(
    ({ albumId, photo }: Assignment) => addPhotoToAlbum(photo.id, albumId), 
    optimisticAdd
  )

export const useRemovePhoto = () =>
  useMutation(
    ({ albumId, photo }: Assignment) => removePhotoFromAlbum(photo.id, albumId), 
    optimisticRemove
  )

const eagerUpload = <T, S extends Saved>(key: any): MutationConfig<S, string, T, S[]> => ({
  onSuccess: (item: S) => {
    queryCache.setQueryData(key, (old: S[] | undefined) => old ? [...old, item] : [item])
  },

  throwOnError: true,
});

const optimisticDelete = <S extends Saved>(key: any): MutationConfig<S, string, S, S[]> => ({
  onMutate: (item) => {
    const old = queryCache.getQueryData(key) as S[];
    queryCache.setQueryData(key, (old: S[] | undefined) => old?.filter(t => t.id !== item.id) || [])
    return old;
  },

  onError: (_error, _item, old) => {
    queryCache.setQueryData(key, old);
  },
});

const optimisticAdd: MutationConfig<void, string, Assignment, SavedAlbum> = {
  onMutate: ({ albumId, photo }) => {
    const key = ['album', albumId];
    const old = queryCache.getQueryData(key) as SavedAlbum;
    queryCache.setQueryData(key, (old: SavedAlbum | undefined) => update(old!, { 
      photos: { 
        $push: [photo] 
      } 
    }))
    return old;
  },

  onError: (_error, { albumId }, old) => {
    queryCache.setQueryData(['album', albumId], old);
  },
};

const optimisticRemove: MutationConfig<void, string, Assignment, SavedAlbum> = {
  onMutate: ({ albumId, photo }) => {
    const key = ['album', albumId];
    const old = queryCache.getQueryData(key) as SavedAlbum;
    queryCache.setQueryData(key, (old: SavedAlbum | undefined) => update(old!, {
      photos: {
        $apply: (photos: SavedPhoto[]) => photos.filter(p => p.id !== photo.id)
      }
    }))
    return old;
  },

  onError: (_error, { albumId }, old) => {
    queryCache.setQueryData(['album', albumId], old);
  },
};
