import { DivProps } from 'react-html-props'

import { selectTodo } from '../../../slices/todo'
import { useAppSelector } from '../../../hooks/redux'

type TodoItemProps = DivProps & {
  itemId: string | null
  depth: number
}

const className = ''

const TodoItem: React.FC<TodoItemProps> = ({ itemId, depth }) => {
  const { items } = useAppSelector(selectTodo)

  const item = React.useMemo(() => {
    if (!itemId) {
      return null
    }

    return items.find(item => item.id === itemId)!
  }, [itemId, items])

  if (!item) {
    return null
  }

  return (
    <div className={className}>
      {depth} - {JSON.stringify(item)}
    </div>
  )
}

export default TodoItem
