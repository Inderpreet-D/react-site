import { InputProps } from 'react-html-props'
import clsx from 'clsx'

const className =
  'outline-none px-3 py-1 m-0 h-10 border-primary-light border border-solid text-primary-dark box-border rounded-xl'

const TextInput: React.FC<InputProps> = ({
  className: extraClass,
  ...props
}) => <input className={clsx(className, extraClass)} {...props} />

export default TextInput
