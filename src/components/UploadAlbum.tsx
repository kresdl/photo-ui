import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Album } from '../types'

type Props = {
  onUpload: (album: Album) => Promise<void>
}

const UploadAlbum: React.FC<Props> = ({ onUpload }) => {
  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const { value: title } = form.elements.namedItem('title') as HTMLInputElement

    try {
      await onUpload({ title })
      form.reset()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Field>Title</Field>
      <Submit>Upload</Submit>
    </form>
  )
}

export default UploadAlbum