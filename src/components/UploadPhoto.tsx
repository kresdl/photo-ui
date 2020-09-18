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
      titleEm = elements.namedItem('title') as HTMLInputElement,
      { value: title } = titleEm,
      { value: url } = elements.namedItem('url') as HTMLInputElement,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement

    await onUpload({ url, title, comment })
    form.reset()
    titleEm.focus()
  }

  return (
    <form onSubmit={submit}>
      <Field autoFocus={true}>Title</Field>
      <Field autoComplete={true} >URL</Field>
      <Field optional id="comment">Comment (optional)</Field>
      <div className="form-group">
        <Submit>Upload</Submit>
      </div>
    </form>
  )
}

export default UploadPhoto