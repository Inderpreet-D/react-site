import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'

import { logout } from '../../../slices/auth'

const Page = () => {
  const dispatch = useAppDispatch()

  return (
    <Container>
      <ContainerTitle>My Account</ContainerTitle>

      <Button onClick={() => dispatch(logout())} className='mt-4 w-full'>
        Log out
      </Button>
    </Container>
  )
}

export default Page
