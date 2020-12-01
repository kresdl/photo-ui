import React from 'react'
import Field from './Field'
import Submit from './Submit'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../lib/util'
import { queryCache } from 'react-query'
import store from '../lib/store'

const Login: React.FC = () => {
  const history = useHistory()

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement,
      { value: email } = elements.namedItem('email') as HTMLInputElement,
      { value: password } = elements.namedItem('password') as HTMLInputElement

    store.notify('Attempting to log in...')

    try {
      const token = await login({ email, password }) as string
      sessionStorage.setItem('token', token)
      store.setAuth(token)
      queryCache.clear()
      history.push('/user')
    } catch (err) {
      store.notify(err)
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