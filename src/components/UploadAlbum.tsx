import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { uploadAlbum } from '../util'
import { useNotify } from '../hooks'
import styled from 'styled-components'

const Form = styled.form`
  width: 20rem;
`

const UploadAlbum: React.FC = () => {
  const { notify } = useNotify()

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const token = sessionStorage.getItem('token')
    if (!token) return

    const { elements } = e.target as HTMLFormElement
    const { value: title } = elements.namedItem('title') as HTMLInputElement

    notify('Uploading...')

    try {
      await uploadAlbum({ title }, token)
      notify('Upload successful!')
    } catch (err) {
      notify(err)
    }
  }

  return (
    <Form className="ml-5" onSubmit={submit}>
      <Field>Title</Field>
      <Submit>Upload album</Submit>
    </Form>
  )
}

export default UploadAlbum