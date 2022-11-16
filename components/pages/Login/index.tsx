import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import TextField from '../../atoms/TextField'
import Button from '../../atoms/Button'

import { attemptLogin, selectAuth, toggleRegister } from '../../../slices/auth'

const defaultValues = {
  username: '',
  password: '',
  confirm: ''
}

const Page = () => {
  const dispatch = useAppDispatch()
  const { registering, loading, redirect } = useAppSelector(selectAuth)

  const [values, setValues] = React.useState(defaultValues)
  const [interacted, setInteracted] = React.useState(false)
  const [passwordTouched, setPasswordTouched] = React.useState(false)
  const issue = React.useMemo(() => {
    const { username, password, confirm } = values

    if (username.length === 0) {
      return 'Must enter a username'
    }

    if (passwordTouched && password.length < 6) {
      return 'Password must be at least 6 characters'
    }

    if (registering) {
      if (password !== confirm) {
        return 'Passwords must match'
      }
    }

    return ''
  }, [values, passwordTouched, registering])
  const canLogin = React.useMemo(() => {
    const { username, password, confirm } = values

    const fieldsFilled = username.length > 0 && password.length >= 6

    if (registering) {
      return fieldsFilled && password === confirm
    }

    return fieldsFilled
  }, [values, registering])
  const loginButtonDisabled = React.useMemo(() => !canLogin || loading, [
    canLogin,
    loading
  ])

  const handleChange = React.useCallback(
    (prop: string, trim = false) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setInteracted(true)
      const val = trim ? e.target.value.trim() : e.target.value
      setValues(old => ({ ...old, [prop]: val }))
      if (prop === 'password') {
        setPasswordTouched(true)
      }
    },
    []
  )

  const handleLogin = React.useCallback(() => {
    if (!loginButtonDisabled) {
      dispatch(attemptLogin(values.username, values.password))
    }
  }, [loginButtonDisabled, dispatch, values.username, values.password])

  return (
    <Container>
      <div className='flex flex-col items-center w-full lg:w-2/3 mx-auto'>
        {redirect && (
          <div className='mb-4 mt-4 text-red-500 font-medium'>
            You must login to view that page.
          </div>
        )}

        <TextField
          id='username'
          value={values.username}
          onChange={handleChange('username', true)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
          placeholder='Username'
          aria-label='Username'
          className='w-full'
        />

        <TextField
          id='password'
          value={values.password}
          onChange={handleChange('password')}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleLogin()
            }
          }}
          placeholder='Password'
          aria-label='Password'
          type='password'
          className='mt-4 w-full'
        />

        {registering && (
          <TextField
            value={values.confirm}
            onChange={handleChange('confirm')}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleLogin()
              }
            }}
            placeholder='Confirm Password'
            aria-label='Confirm Password'
            type='password'
            className='mt-4 w-full'
          />
        )}

        {interacted && !canLogin && issue.length > 0 && (
          <div className='mt-4 text-red-500 text-lg font-medium'>{issue}</div>
        )}

        <Button
          onClick={handleLogin}
          disabled={loginButtonDisabled}
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
