import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import Check from '../Check'

type CheckboxProps = DivProps & {
  checked: boolean
  onCheck: (newVal: boolean) => void
}

const className =
  'group relative flex items-center justify-center border-2 border-sky-400 rounded box-border w-4 h-4 bg-transparent transition-all duration-700 hover:border-sky-200 cursor-pointer'

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
