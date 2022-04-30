import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'flex flex-col min-h-full px-4 py-0'

const ContainerSection: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <div className={clsx(className, extraClass)} {...props} />

export default ContainerSection
