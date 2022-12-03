import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import Check from '../Check'

type CheckboxProps = DivProps & {
  checked: boolean
  onCheck: (newVal: boolean) => void
}

const className =
  'group relative flex items-center justify-center border-2 border-primary-light rounded box-border min-w-[1rem] w-4 max-w-[1rem] min-h-[1rem] h-4 max-h-[1rem] bg-transparent transition-all duration-700 hover:border-primary-dark cursor-pointer'

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheck,
  className: extraClass,
  ...props
}) => (
  <div
    onClick={() => onCheck(!checked)}
    className={clsx(className, extraClass)}
    {...props}
  >
    <Check checked={checked} />
  </div>
)

export default Checkbox
