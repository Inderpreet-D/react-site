import { ButtonProps } from 'react-html-props'
import clsx from 'clsx'

export type MyButtonProps = ButtonProps & {
  active?: boolean
}

const className =
  'flex items-center justify-center m-0 text-base text-center no-underline appearance-none outline-none transition-all duration-300 border border-primary-light rounded-xl px-4 py-2 bg-transparent text-white hover:bg-primary-dark hover:text-dark-light focus:bg-primary-light focus:text-white active:scale-95 disabled:border-dark-main disabled:bg-dark-light disabled:text-dark-dark box-border min-h-10 h-auto disabled:pointer-events-none'

const Button: React.FC<MyButtonProps> = ({
  active,
  className: extraClass,
  ...props
}) => (
  <button
    className={clsx(
      className,
      active && 'text-white bg-primary-light',
      extraClass
    )}
    {...props}
  />
)

export default Button
