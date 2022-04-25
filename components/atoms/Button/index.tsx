import { ButtonProps } from 'react-html-props'
import clsx from 'clsx'

type MyButtonProps = ButtonProps & {
  active?: boolean
}

const className =
  'flex items-center justify-center m-0 text-base text-center no-underline appearance-none outline-none transition-all duration-300 border border-sky-400 rounded-xl px-4 py-2 bg-transparent text-white hover:bg-sky-800 hover:text-slate-400 focus:bg-sky-400 focus:text-white active:scale-95 disabled:border-slate-500 disabled:bg-slate-300 disabled:text-slate-800 box-border min-h-10 h-auto disabled:pointer-events-none'

const Button: React.FC<MyButtonProps> = ({
  active,
  className: extraClass,
  ...props
}) => (
  <button
    className={clsx(className, active && 'text-white bg-sky-400', extraClass)}
    {...props}
  />
)

export default Button
