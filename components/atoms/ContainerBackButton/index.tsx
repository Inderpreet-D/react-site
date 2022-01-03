import { useRouter } from 'next/router'
import { FaLessThan } from '@react-icons/all-files/fa/FaLessThan'

import { Button } from './styles'

type ContainerBackButtonProps = {
  to: string
}

const ContainerBackButton: React.FC<ContainerBackButtonProps> = ({ to }) => {
  const router = useRouter()

  return (
    <Button onClick={() => router.push(`/${to}`)}>
      <FaLessThan />
    </Button>
  )
}

export default ContainerBackButton
