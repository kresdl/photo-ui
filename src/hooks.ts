import { useState, useContext, useCallback } from 'react'
import MessageContext from './components/MessageContext'
import { SavedAlbum, SavedPhoto } from './types'
import { downloadAlbum } from './util'

export const useNotify = () => {
  const [msg, setMsg] = useContext(MessageContext)!

  return {
    msg,

    notify: useCallback((msg: string[] | string | null | undefined) => {
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
    }, [setAlbum]),

    removePhoto: useCallback((photo: SavedPhoto) => {
      setAlbum(album => album && {
        ...album,
        photos: album.photos!.filter(p => photo.id !== p.id)
      })
    }, [setAlbum])
  }
}

export const useChangeAlbum = () => {
  const { notify } = useNotify()
  const { setAlbum } = useAlbum()

  return async (id: number) => {
    const token = sessionStorage.getItem('token')
    if (!token) return

    notify('Downloading...')

    try {
      const newAlbum = await downloadAlbum(id, token)
      setAlbum(newAlbum)
      notify(null)
    } catch (err) {
      notify(err)
    }
  }
}
