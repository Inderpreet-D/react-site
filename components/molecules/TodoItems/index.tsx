import { DivProps } from 'react-html-props'

import { selectTodo } from '../../../slices/todo'
import { useAppSelector } from '../../../hooks/redux'

import TodoItem from '../../atoms/TodoItem'

type TodoItemsProps = DivProps & {
  parent: string | null
  depth: number
}

const TodoItems: React.FC<TodoItemsProps> = ({ parent, depth }) => {
  const { items } = useAppSelector(selectTodo)

  const children = React.useMemo(
    () => items.filter(item => item.parent === parent),
    [items, parent]
  )

  const newDepth = React.useMemo(() => depth + 1, [depth])

  const item = React.useMemo(() => {
    if (!parent) {
      return null
    }

    return items.find(item => item.id === parent)!
  }, [parent, items])

  return (
    <>
      {item && <TodoItem item={item} depth={depth} />}

      {children.map(child => (
        <TodoItems key={child.id} parent={child.id} depth={newDepth} />
      ))}
    </>
  )
}

export default TodoItems
