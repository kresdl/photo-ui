import React, { useEffect, useReducer, useRef } from 'react'
import Field from './Field'
import Submit from './Submit'
import { Photo, SavedPhoto } from '../types'
import FileInput from './FileInput'
import Attachment from './Attachment'
import firebase from 'firebase/app'
import 'firebase/storage'
import ProgressBar from './ProgressBar'
import { useMounted } from '../lib/hooks'

type State = {
  file?: File | null
  progress?: number | null
  error?: firebase.storage.FirebaseStorageError | null
}

type Action = {
  type: 'select' | 'complete' | 'error' | 'progress'
  file?: File
  progress?: number
  error?: firebase.storage.FirebaseStorageError
}

const reducer: React.Reducer<State, Action> = (state, { type, file, error, progress }) => {
  switch (type) {
    case 'select': return { file }
    case 'progress': return { ...state, error: null, progress }
    case 'complete': return {}
    case 'error': return { ...state, progress: null, error }
    default: return state
  }
}

type Props = {
  onUpload: (photo: Photo) => Promise<SavedPhoto | undefined>
}

const UploadPhoto: React.FC<Props> = ({ onUpload }) => {
  const mounted = useMounted()
  const [{ file, progress, error }, dispatch] = useReducer(reducer, {})

  const select = (file: File) => {
    dispatch({ type: 'select', file })
  }

  const submit: React.FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()

    const form = evt.target as HTMLFormElement,
      { elements } = form,
      titleEm = elements.namedItem('title') as HTMLInputElement,
      { value: title } = titleEm,
      { value: comment } = elements.namedItem('comment') as HTMLInputElement

    const ref = firebase.storage().ref()
    const res = ref.child(file?.name!)

    const task = res.put(file!);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      
      snapshot => {
        if (!mounted.current) return
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        dispatch({ type: 'progress', progress })
      },

      error => {
        mounted.current && dispatch({ type: 'error', error })
      },

      async () => {
        try {

          await onUpload({
            url: await task.snapshot.ref.getDownloadURL(),
            title, comment
          })

          if (!mounted.current) return;

          form.reset()
          titleEm.focus()

        } catch (err) {
          console.log(err)
        }

        dispatch({ type: 'complete' })
      }
    )
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <FileInput required onPick={select} />
        {file && <Attachment ml="1rem" file={file} />}
      </div>
      <Field autoFocus={true}>Title</Field>
      <Field optional id="comment">Comment (optional)</Field>
      <Submit>Upload</Submit>
      {error && <p>{error.message}</p>}
      {typeof progress === 'number'
        ? <ProgressBar progress={progress} />
        : null
      }
    </form>
  )
}

export default UploadPhoto