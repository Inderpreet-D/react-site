import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'mb-3 border-b-2 border-b-dark-light'

const Separator: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
)

export default Separator
