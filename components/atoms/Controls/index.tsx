import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className = 'flex items-center justify-center mb-2 text-2xl'

const Controls: React.FC<DivProps> = ({ className: extraClass, ...props }) => (
  <div className={clsx(className, extraClass)} {...props} />
)

export default Controls
