import { DivProps } from 'react-html-props'
import clsx from 'clsx'

const className =
  'flex flex-col items-center justify-center mb-2 border-r-0 border-b-2 border-b-slate-900 box-border px-2 pt-2 pb-4 lg:mx-2 lg:mt-2 lg:mb-0 lg:border-r-2 lg:border-r-slate-900 lg:border-b-0 lg:py-2 lg:pr-4 lg:pb-0'

const ButtonHolder: React.FC<DivProps> = ({
  className: extraClass,
  ...props
}) => <div className={clsx(className, extraClass)} {...props} />

export default ButtonHolder
