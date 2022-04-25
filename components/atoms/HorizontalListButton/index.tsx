import clsx from 'clsx'

import Button, { MyButtonProps } from '../Button'

const className =
  'min-w-[12rem] w-full max-w-[12rem] text-center mr-4 last:mr-0'

const HorizontalListButton: React.FC<MyButtonProps> = ({
  className: extraClass,
  ...props
}) => <Button className={clsx(className, extraClass)} {...props} />

export default HorizontalListButton
