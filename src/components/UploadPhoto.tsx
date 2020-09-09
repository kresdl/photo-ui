import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { uploadPhoto } from '../util'
import { useNotify } from '../hooks'
import styled from 'styled-components'

const Form = styled.form`
  width: 20rem;
`

const UploadPhoto: React.FC = () => {
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
      await uploadPhoto({ url, title, comment }, token)
      notify('Upload successful!')
    } catch (err) {
      notify(err)
    }
  }

  return (
    <Form className="ml-5" onSubmit={submit}>
      <Field>Title</Field>
      <Field>URL</Field>
      <Field optional id="comment">Comment (optional)</Field>
      <Submit>Upload photo</Submit>
    </Form>
  )
}

export default UploadPhoto