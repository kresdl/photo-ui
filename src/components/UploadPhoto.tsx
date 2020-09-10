import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { uploadPhoto } from '../util'
import { useNotify } from '../hooks'
import { SavedPhoto } from '../types'

type Props = {
  onUpload: (photo: SavedPhoto) => void
}

const UploadPhoto: React.FC<Props> = ({ onUpload }) => {
  const { notify } = useNotify()
  
  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    if (!token) return

    const { elements } = e.target as HTMLFormElement,
      { value: url } = elements.namedItem('url') as HTMLInputElement,
      { value: title } = elements.namedItem('title') as HTMLInputElement,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement

    notify('Uploading photo...')

    try {
      const photo = await uploadPhoto({ url, title, comment }, token) as SavedPhoto
      notify('Upload successful!')
      onUpload(photo)

    } catch (err) {
      notify(err)
    }
  }

  return (
    <form onSubmit={submit}>
      <Field>Title</Field>
      <Field>URL</Field>
      <Field optional id="comment">Comment (optional)</Field>
      <Submit>Upload photo</Submit>
    </form>
  )
}

export default UploadPhoto