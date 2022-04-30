import { useRouter } from 'next/router'
import { FaLessThan } from '@react-icons/all-files/fa/FaLessThan'

import Button from '../Button'

type ContainerBackButtonProps = {
  to: string
}

const className =
  'absolute -top-px -left-px rounded-tr-none rounded-bl-none border-t-transparent border-l-transparent md:top-5 md:left-5 md:rounded-tr-xl md:rounded-bl-xl md:border-l md:border-t md:border-t-inherit md:border-l-inherit'

const ContainerBackButton: React.FC<ContainerBackButtonProps> = ({ to }) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(`/${to}`)}
      className={className}
      aria-label='Back'
    >
      <FaLessThan />
    </Button>
  )
}

export default ContainerBackButton
