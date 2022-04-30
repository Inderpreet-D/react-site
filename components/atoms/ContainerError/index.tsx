import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'flex justify-center mb-5 text-4xl text-red-500 text-center'

const ContainerError: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <div className={clsx(className, extraClass)} {...props} />

export default ContainerError
