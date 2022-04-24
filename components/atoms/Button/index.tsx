import { ButtonPropsWithoutRef } from 'react-html-props'
import clsx from 'clsx'

const className =
  'm-0 text-base text-center no-underline appearance-none outline-none transition-all duration-300 border border-sky-400 rounded-xl px-4 py-2 bg-transparent text-white hover:bg-sky-800 hover:text-black focus:bg-sky-800 focus:text-black active:scale-95 disabled:border-slate-500 disabled:bg-slate-300 disabled:text-slate-800 box-border flex items-center justify-center max-h-10 h-full disabled:pointer-events-none'

const Button: React.FC<ButtonPropsWithoutRef> = ({
  className: extraClass,
  ...props
}) => {
  return <button className={clsx(className, extraClass)} {...props} />
}

export default Button
