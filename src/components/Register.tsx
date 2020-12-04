import React, { useEffect, useState, ChangeEvent } from 'react'
import Input from './Input'
import SubmitCancel from './SubmitCancel'
import { useHistory } from 'react-router-dom'
import { register } from '../lib/util'
import store from '../lib/store'

const Register: React.FC = () => {
  useEffect(
    () => void store.notify(null), []
  )

  const [pwSync, setPwSync] = useState(true),
    history = useHistory<string>(),

    cancel = () => {
      store.notify(null)
      history.push('/')
    },

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
        store.notify('Register successful!')
        history.push('/')
      } catch (err) {
        store.notify(err)
      }
    },

    pwProps = {
      autoComplete: 'off',
      required: true,
      type: 'password',
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
      <Input autoComplete="off" required name="first-name" label="First name" />
      <Input autoComplete="off" required name="last-name" label="Last name" />
      <Input autoComplete="off" required type="email" name="email" label="Email" />
      <Input {...pwProps} autoComplete="off" required name="password" label="Password (5 characters minimum)" pattern=".{5,}"/>
      <Input {...pwProps} autoComplete="off" required label="Repeat password" />
      <SubmitCancel ok="Register" onCancel={cancel} />
    </form>
  )
}

export default Register