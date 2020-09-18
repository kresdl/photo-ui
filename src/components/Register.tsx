import React, { useState, ChangeEvent } from 'react'
import Field from './Field'
import SubmitCancel from './SubmitCancel'
import { useHistory } from 'react-router-dom'
import { register } from '../util'
import { useNotify } from '../hooks'
import { Message } from '../types'

const Register: React.FC = () => {
  const [pwSync, setPwSync] = useState(true),
    history = useHistory<Message>(),
    { notify } = useNotify(),

    cancel = () => history.push('/'),

    submit: React.FormEventHandler<HTMLFormElement> = async e => {
      e.preventDefault()

      if (!pwSync) return notify('Password mismatch')

      const { elements } = e.target as HTMLFormElement,
        { value: first_name } = elements.namedItem('first-name') as HTMLInputElement,
        { value: last_name } = elements.namedItem('last-name') as HTMLInputElement,
        { value: email } = elements.namedItem('email') as HTMLInputElement,
        { value: password } = elements.namedItem('password') as HTMLInputElement

      notify('Registering...')

      try {
        await register({ first_name, last_name, email, password })
        history.push('/', 'Register successful!')
      } catch (err) {
        notify(err)
      }
    },

    pwProps = {
      type: "password",
      invalid: !pwSync,

      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const { elements } = e.target.form!,
          { value: pw } = elements.namedItem('password') as HTMLInputElement,
          { value: repeatPw } = elements.namedItem('repeat-password') as HTMLInputElement
        setPwSync(pw === repeatPw)
      }
    }

  return (
    <form onSubmit={submit}>
      <Field>First name</Field>
      <Field>Last name</Field>
      <Field type="email">Email</Field>
      <Field {...pwProps}>Password</Field>
      <Field {...pwProps}>Repeat password</Field>
      <SubmitCancel ok="Register" onCancel={cancel} />
    </form>
  )
}

export default Register