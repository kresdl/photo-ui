/* eslint-disable no-throw-literal */
import { Photo, Album, SavedAlbum, SavedPhoto, Register, Credentials, Titled, Assignment, JSend, Res } from '../types'
import AggregateError from 'aggregate-error'

export const byTitle = (a: Titled, b: Titled) =>
  a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

const getToken = () => {
  const token = sessionStorage.getItem('token')
  if (!token) throw Error('Not signed in')
  return token
}

const extract = <T>(res: Res<T>) => {
  if (!res.ok) {
    const err = Array.isArray(res.data)
      ? new AggregateError(res.data.map(Error))
      : Error(res.data as string)

    err.name = 'fail'
    throw err;
  }
  return res.data as T;
}

export const register = (register: Register) => io({
  url: 'https://fed19-peterh-photo.herokuapp.com/register',
  method: 'POST',
  data: register
})
.then(extract)

export const login = (credentials: Credentials) => io<string>({
  url: 'https://fed19-peterh-photo.herokuapp.com/login',
  method: 'POST',
  data: credentials
})
.then(extract)

export const uploadPhoto = (photo: Photo) => io<SavedPhoto>({
  url: 'http://fed19-peterh-photo.herokuapp.com/photos',
  method: 'POST',
  data: photo,
  token: getToken()
})
.then(extract)

export const uploadAlbum = (album: Album) => io<SavedAlbum>({
  url: 'http://fed19-peterh-photo.herokuapp.com/albums',
  method: 'POST',
  data: album,
  token: getToken()
})
.then(extract)

export const downloadPhotos = () => io<SavedPhoto[]>({
  url: 'http://fed19-peterh-photo.herokuapp.com/photos',
  method: 'GET',
  token: getToken()
})
.then(extract)

export const downloadAlbums = () => io<SavedAlbum[]>({
  url: 'http://fed19-peterh-photo.herokuapp.com/albums',
  method: 'GET',
  token: getToken()
})
.then(extract)

export const downloadPhoto = (photo: number) => io<SavedPhoto>({
  url: `http://fed19-peterh-photo.herokuapp.com/photos/${photo}`,
  method: 'GET',
  token: getToken()
})
.then(extract)

export const downloadAlbum = (album: number) => io<SavedAlbum>({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}`,
  method: 'GET',
  token: getToken()
})
.then(extract)

export const addPhotoToAlbum = (photo: number, album: number) => io<Assignment>({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}/${photo}`,
  method: 'PUT',
  token: getToken()
})
.then(extract)

export const removePhotoFromAlbum = (photo: number, album: number) => io<Assignment>({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}/${photo}`,
  method: 'DELETE',
  token: getToken()
})
.then(extract)

export const deletePhoto = (photo: number) => io<SavedPhoto>({
  url: `http://fed19-peterh-photo.herokuapp.com/photos/${photo}`,
  method: 'DELETE',
  token: getToken()
})
.then(extract)

export const deleteAlbum = (album: number) => io<SavedAlbum>({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}`,
  method: 'DELETE',
  token: getToken()
})
.then(extract)

type IOOptions = {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  token?: string
}

export const io = async <T = undefined>({ url, method = 'GET', data, token }: IOOptions) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  token && headers.append('Authorization', 'Bearer ' + token)

  try {
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers,
      body: JSON.stringify(data)
    })
    const res = await response.json() as JSend<T>

    if (res.status === 'error')
      throw Error(res.message)

    return {
      ok: res.status === 'success',
      data: res.data
    } as Res<T>

  } catch (err) {
    throw Error('Network error')
  }
};