import React, { useState, ChangeEvent } from 'react'
import Field from './Field'
import SubmitCancel from './SubmitCancel'
import { useHistory } from 'react-router-dom'
import { register } from '../lib/util'
import { Message } from '../types'
import store from '../lib/store'

const Register: React.FC = () => {
  const [pwSync, setPwSync] = useState(true),
    history = useHistory<Message>(),
    cancel = () => history.push('/'),

    submit: React.FormEventHandler<HTMLFormElement> = async e => {
      e.preventDefault()

      if (!pwSync) return store.notify('Password mismatch')

      const { elements } = e.target as HTMLFormElement,
        { value: first_name } = elements.namedItem('first-name') as HTMLInputElement,
        { value: last_name } = elements.namedItem('last-name') as HTMLInputElement,
        { value: email } = elements.namedItem('email') as HTMLInputElement,
        { value: password } = elements.namedItem('password') as HTMLInputElement

      store.notify('Registering...')

      try {
        await register({ first_name, last_name, email, password })
        history.push('/', 'Register successful!')
      } catch (err) {
        store.notify(err)
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