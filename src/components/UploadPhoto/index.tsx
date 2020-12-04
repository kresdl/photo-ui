import React from 'react'
import Input from '../Input'
import Submit from '../Submit'
import { Photo, SavedPhoto } from '../../types'
import FileInput from '../FileInput'
import Attachment from '../Attachment'
import ProgressBar from '../ProgressBar'
import useAdapter from './use-adapter'

type Props = {
  onUpload: (photo: Photo) => Promise<SavedPhoto | undefined>
}

const UploadPhoto: React.FC<Props> = ({ onUpload }) => {

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const form = evt.target as HTMLFormElement,
      { elements } = form,
      titleEm = elements.namedItem('title') as HTMLInputElement,
      { value: title } = titleEm,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement,
      loc = await upload()

    try {
      await onUpload({ ...loc, title, comment })
      form.reset()
      titleEm.focus()

    } catch (err) {
      console.log(err)
    }
  }

  const { select, upload, file, progress, error } = useAdapter()
  const uploading = typeof progress === 'number'

  return (
    <form onSubmit={submit}>
      <Input autoComplete="off" required autoFocus={true} name="title" label="Title" />
      <Input autoComplete="off" name="comment" label="Comment (optional)" />
      <FileInput required onPick={select} />
      {file && <Attachment file={file} />}
      <Submit>Upload</Submit>
      {error && <p>{error.message}</p>}
      {uploading && <ProgressBar progress={progress!} />}
    </form>
  )
}

export default UploadPhoto 