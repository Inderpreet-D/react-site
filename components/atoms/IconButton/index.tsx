import { IconType } from '@react-icons/all-files'
import clsx from 'clsx'

import Button, { MyButtonProps } from '../Button'

type MyIconButtonProps = MyButtonProps & {
  Icon: IconType
  size?: number
}

const className = 'group px-2 py-2 min-h-0'

const IconButton: React.FC<MyIconButtonProps> = ({
  Icon,
  size = 14,
  className: extraClass,
  ...props
}) => (
  <Button className={clsx(className, extraClass)} {...props}>
    <Icon
      size={size}
      className='text-primary-main group-active:text-dark-dark group-focus:text-dark-dark'
    />
  </Button>
)

export default IconButton
