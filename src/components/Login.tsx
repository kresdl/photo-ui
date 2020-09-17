import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../util'
import { useNotify } from '../hooks'
import { queryCache } from 'react-query'

const Login: React.FC = () => {
  const history = useHistory()
  const { notify } = useNotify()

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement,
      { value: email } = elements.namedItem('email') as HTMLInputElement,
      { value: password } = elements.namedItem('password') as HTMLInputElement

    notify('Attempting to log in...')

    try {
      const token = await login({ email, password }) as string
      sessionStorage.setItem('token', token)
      queryCache.clear()
      history.push('/user')
    } catch (err) {
      notify(err)
    }
  }

  return (
    <>
      <form onSubmit={submit}>
        <Field>Email</Field>
        <Field type="password">Password</Field>
        <Submit>Login</Submit>
      </form>
      <Link className="d-block form-group" to="/register">Register</Link>
    </>
  )
}

export default Login