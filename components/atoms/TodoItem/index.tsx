import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import { selectTodo, setChecked } from '../../../slices/todo'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import Checkbox from '../Checkbox'

type TodoItemProps = DivProps & {
  itemId: string | null
  depth: number
}

const className = 'flex mb-4 last:mb-0 items-center'

const TodoItem: React.FC<TodoItemProps> = ({ itemId, depth }) => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(selectTodo)

  const item = React.useMemo(() => {
    if (!itemId) {
      return null
    }

    return items.find(item => item.id === itemId)!
  }, [itemId, items])

  const handleCheck = React.useCallback(() => {
    if (item) {
      dispatch(setChecked({ id: item.id, checked: !item.checked }))
    }
  }, [item, dispatch])

  if (!item) {
    return null
  }

  return (
    <div className={className} style={{ marginLeft: `${depth * 8}px` }}>
      <Checkbox checked={item.checked} onCheck={handleCheck} />

      <div
        className={clsx(
          'ml-2 transition-all',
          item.checked && 'line-through text-sky-600 decoration-sky-400'
        )}
      >
        {item.text}
      </div>
    </div>
  )
}

export default TodoItem
