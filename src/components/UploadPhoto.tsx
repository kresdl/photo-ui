import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Photo } from '../types'

type Props = {
  onUpload: (photo: Photo) => Promise<void>
}

const UploadPhoto: React.FC<Props> = ({ onUpload }) => {
  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement,
      { elements } = form,
      { value: url } = elements.namedItem('url') as HTMLInputElement,
      { value: title } = elements.namedItem('title') as HTMLInputElement,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement

    try {
      await onUpload({ url, title, comment })
      form.reset()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Field>Title</Field>
      <Field autoComplete={true} >URL</Field>
      <Field optional id="comment">Comment (optional)</Field>
      <Submit>Upload</Submit>
    </form>
  )
}

export default UploadPhoto