import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import TextField from '../../atoms/TextField'
import Checkbox from '../../atoms/Checkbox'
import Button from '../../atoms/Button'

import { attemptLogin, selectAuth, toggleRegister } from '../../../slices/auth'
import { ChangeEvent } from 'react'

const defaultValues = {
  username: '',
  password: '',
  confirm: ''
}

const Page = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { registering, token, loading } = useAppSelector(selectAuth)

  const [values, setValues] = React.useState(defaultValues)
  const [interacted, setInteracted] = React.useState(false)
  const issue = React.useMemo(() => {
    const { username, password, confirm } = values

    if (username.length === 0) {
      return 'Must enter a username'
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }

    if (registering) {
      if (password !== confirm) {
        return 'Passwords must match'
      }
    }

    return ''
  }, [values, registering])
  const canLogin = React.useMemo(() => issue.length === 0, [issue.length])

  // Redirect when a token is
  React.useEffect(() => {
    if (typeof token !== 'string' || token.length === 0) {
      return
    }

    router.back()
  }, [token, router])

  const handleChange = React.useCallback(
    (prop: string, trim = false) => (e: ChangeEvent<HTMLInputElement>) => {
      setInteracted(true)
      const val = trim ? e.target.value.trim() : e.target.value
      setValues(old => ({ ...old, [prop]: val }))
    },
    []
  )

  const handleLogin = React.useCallback(() => {
    dispatch(attemptLogin(values.username, values.password))
  }, [dispatch, values.username, values.password])

  return (
    <Container>
      <div className='flex flex-col items-center w-1/3 mx-auto'>
        <TextField
          value={values.username}
          onChange={handleChange('username', true)}
          placeholder='Username'
          aria-label='Username'
          className='w-full'
        />

        <TextField
          value={values.password}
          onChange={handleChange('password')}
          placeholder='Password'
          aria-label='Password'
          type='password'
          className='mt-4 w-full'
        />

        {registering && (
          <TextField
            value={values.confirm}
            onChange={handleChange('confirm')}
            placeholder='Confirm Password'
            aria-label='Confirm Password'
            type='password'
            className='mt-4 w-full'
          />
        )}

        {interacted && !canLogin && (
          <div className='mt-4 text-red-500 text-lg font-medium'>{issue}</div>
        )}

        <Button
          onClick={handleLogin}
          disabled={!canLogin || loading}
          className='mt-4 w-full'
        >
          {registering ? 'Sign Up' : 'Login'}
        </Button>

        <div className='flex items-center mt-2'>
          {registering ? 'Have an account?' : 'New here?'}
          <span
            onClick={() => dispatch(toggleRegister())}
            className='ml-1 text-sky-500 hover:text-sky-700 cursor-pointer hover:underline select-none'
          >
            {registering ? 'Sign in' : 'Create an account'}
          </span>
          .
        </div>
      </div>
    </Container>
  )
}

export default Page
