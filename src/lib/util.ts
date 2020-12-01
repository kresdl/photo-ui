/* eslint-disable no-throw-literal */
import { Photo, Album, SavedAlbum, SavedPhoto, Register, Credentials, Titled, Assignment } from '../types'

export const byTitle = (a: Titled, b: Titled) => 
  a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

const getToken = () => {
  const token = sessionStorage.getItem('token')
  if (!token) throw 'Not signed in'
  return token
}

export const register = (register: Register) => io({
  url: 'https://fed19-peterh-photo.herokuapp.com/register',
  method: 'POST',
  data: register
}) as Promise<void>

export const login = (credentials: Credentials) => io({
  url: 'https://fed19-peterh-photo.herokuapp.com/login',
  method: 'POST',
  data: credentials
}) as Promise<string>

export const uploadPhoto = (photo: Photo) => io({
  url: 'http://fed19-peterh-photo.herokuapp.com/photos',
  method: 'POST',
  data: photo,
  token: getToken()
}) as Promise<SavedPhoto>

export const uploadAlbum = (album: Album) => io({
  url: 'http://fed19-peterh-photo.herokuapp.com/albums',
  method: 'POST',
  data: album,
  token: getToken()
}) as Promise<SavedAlbum>

export const downloadPhotos = () => io({
  url: 'http://fed19-peterh-photo.herokuapp.com/photos',
  method: 'GET',
  token: getToken()
}) as Promise<SavedPhoto[]>

export const downloadAlbums = () => io({
  url: 'http://fed19-peterh-photo.herokuapp.com/albums',
  method: 'GET',
  token: getToken()
}) as Promise<SavedAlbum[]>

export const downloadPhoto = (photo: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/photos/${photo}`,
  method: 'GET',
  token: getToken()
}) as Promise<SavedPhoto>

export const downloadAlbum = (album: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}`,
  method: 'GET',
  token: getToken()
}) as Promise<SavedAlbum>

export const addPhotoToAlbum = (photo: number, album: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}/${photo}`,
  method: 'PUT',
  token: getToken()
}) as Promise<Assignment>

export const removePhotoFromAlbum = (photo: number, album: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}/${photo}`,
  method: 'DELETE',
  token: getToken()
}) as Promise<Assignment>

export const deletePhoto = (photo: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/photos/${photo}`,
  method: 'DELETE',
  token: getToken()
}) as Promise<SavedPhoto>

export const deleteAlbum = (album: number) => io({
  url: `http://fed19-peterh-photo.herokuapp.com/albums/${album}`,
  method: 'DELETE',
  token: getToken()
}) as Promise<SavedAlbum>

type IOOptions = {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
  token?: string
}

type Type = (opt: IOOptions) => Promise<any>

const mapFail = (res: any) => 
  Array.isArray(res) ? res.map(item => item.msg) : res

export const io: Type = ({ url, method = 'GET', data, token }) =>
  new Promise(async (resolve, reject) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    token && headers.append('Authorization', 'Bearer ' + token)

    try {
      const response = await fetch(url, {
        method: method.toUpperCase(),
        headers,
        body: JSON.stringify(data)
      })
      const results = await response.json()

      if (results.status === 'error') {
        reject(mapFail(results.status))
      } else if (results.status === 'fail') {
        reject(mapFail(results.data))
      } else {
        resolve(results.data)
      }
    } catch (err) {
      reject('Network error')
    }
  });