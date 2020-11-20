import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Album, SavedAlbum } from '../types'

type Props = {
  onUpload: (album: Album) => Promise<SavedAlbum | undefined>
}

const UploadAlbum: React.FC<Props> = ({ onUpload }) => {
  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement,
      em = form.elements.namedItem('title') as HTMLInputElement,
      { value: title } = em

    try {
      await onUpload({ title })
      form.reset()
      em.focus()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Field autoFocus={true}>Title</Field>
      <Submit>Upload</Submit>
    </form>
  )
}

export default UploadAlbum