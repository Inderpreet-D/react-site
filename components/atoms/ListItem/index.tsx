import { DivPropsWithoutRef } from 'react-html-props'
import clsx from 'clsx'

import Checkbox from '../Checkbox'

type ListItemProps = DivPropsWithoutRef & {
  checked: boolean
  onCheck: () => void
}

const className = 'group flex items-center'

const ListItem: React.FC<ListItemProps> = ({
  checked,
  onCheck,
  children,
  className: extraClass,
  ...props
}) => {
  return (
    <div className={clsx(className, extraClass)} {...props}>
      <Checkbox
        checked={checked}
        onCheck={onCheck}
        className='mr-3 group-hover:border-sky-800'
      />

      <div
        onClick={onCheck}
        className={clsx(
          'cursor-pointer transition-all duration-700 text-white hover:text-sky-400',
          checked && 'line-through text-sky-800 hover:text-sky-800'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default ListItem
