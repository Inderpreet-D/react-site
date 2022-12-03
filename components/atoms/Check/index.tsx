import { DivProps } from 'react-html-props'
import clsx from 'clsx'

type CheckProps = DivProps & {
  checked: boolean
}

const className =
  'absolute top-1/2 left-1/2 w-[0.35rem] h-[0.35rem] -translate-x-1/2 -translate-y-1/2 rounded-circle box-border bg-primary-dark transition-all duration-500 group-hover:bg-primary-light'

const Check: React.FC<CheckProps> = ({
  checked,
  className: extraClass,
  ...props
}) => {
  if (!checked) {
    return null
  }

  return <div className={clsx(className, extraClass)} {...props} />
}

export default Check
