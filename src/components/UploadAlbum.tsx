import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { uploadAlbum } from '../util'
import { useNotify } from '../hooks'
import { SavedAlbum } from '../types'

type Props = {
  onUpload: (photo: SavedAlbum) => void
}

const UploadAlbum: React.FC<Props> = ({ onUpload }) => {
  const { notify } = useNotify()

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    if (!token) return

    const { elements } = e.target as HTMLFormElement
    const { value: title } = elements.namedItem('title') as HTMLInputElement

    notify('Uploading album...')

    try {
      const album = await uploadAlbum({ title }, token) as SavedAlbum
      notify('Upload successful!')
      onUpload(album)
      
    } catch (err) {
      notify(err)
    }
  }

  return (
    <form onSubmit={submit}>
      <Field>Title</Field>
      <Submit>Upload album</Submit>
    </form>
  )
}

export default UploadAlbum