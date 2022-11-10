import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import Username from './Username'
import Password from './Password'
import Button from '../../atoms/Button'

import { logout } from '../../../slices/auth'

const Page = () => {
  const dispatch = useAppDispatch()

  return (
    <Container>
      <ContainerTitle>My Account</ContainerTitle>

      <Username />

      <Password />

      <Button onClick={() => dispatch(logout())} className='mt-10 w-full'>
        Log out
      </Button>
    </Container>
  )
}

export default Page
