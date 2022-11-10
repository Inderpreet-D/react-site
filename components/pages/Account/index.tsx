import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import Username from './Username'
import Button from '../../atoms/Button'

import { logout } from '../../../slices/auth'

const Page = () => {
  const dispatch = useAppDispatch()

  return (
    <Container>
      <ContainerTitle>My Account</ContainerTitle>

      <Username />

      <Button onClick={() => dispatch(logout())} className='mt-8 w-full'>
        Log out
      </Button>
    </Container>
  )
}

export default Page
