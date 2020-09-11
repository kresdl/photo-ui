import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Photo } from '../types'
import { useNotify } from '../hooks'

type Props = {
  onUpload: (photo: Photo) => Promise<void>
}

const UploadPhoto: React.FC<Props> = ({ onUpload }) => {
  const { notify } = useNotify()
  
  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement,
      { elements } = form,
      { value: url } = elements.namedItem('url') as HTMLInputElement,
      { value: title } = elements.namedItem('title') as HTMLInputElement,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement

      notify('Uploading photo...')

      try {
        await onUpload({ url, title, comment })
        notify(null)
        form.reset()
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