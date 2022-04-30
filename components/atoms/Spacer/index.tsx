import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'flex-grow'

const Spacer: React.FC<DivProps> = ({ className: extraClass, ...props }) => {
  return <div className={clsx(className, extraClass)} {...props} />
}

export default Spacer
