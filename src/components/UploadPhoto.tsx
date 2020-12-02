import React, { useReducer } from 'react'
import Input from './Input'
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
      { value: comment } = elements.namedItem('comment') as HTMLInputElement,
      ref = firebase.storage().ref(),
      res = ref.child(file?.name!),
      task = res.put(file!)

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      
      snapshot => {
        if (!mounted.current) return
        dispatch({ 
          type: 'progress', 
          progress: snapshot.bytesTransferred / snapshot.totalBytes
        })
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

  const uploading = typeof progress === 'number'

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <FileInput required onPick={select} />
        {file && <Attachment ml="1rem" file={file} />}
      </div>
      <Input autoComplete="off" required autoFocus={true} name="title" label="Title" />
      <Input autoComplete="off" name="comment" label="Comment (optional)" />
      <Submit>Upload</Submit>
      {error && <p>{error.message}</p>}
      {uploading && <ProgressBar progress={progress!} />}
    </form>
  )
}

export default UploadPhoto