import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'mb-5 text-4xl text-center'

const ContainerTitle: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <div data-cy='title' className={clsx(className, extraClass)} {...props} />

export default ContainerTitle
