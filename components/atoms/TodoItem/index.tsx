import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import { TodoItem as TodoItemType } from '../../../shared/todo'

import Checkbox from '../Checkbox'

import { selectTodo, setChecked, setText } from '../../../slices/todo'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

type TodoItemProps = DivProps & {
  item: TodoItemType
  depth: number
}

const className = 'flex mb-4 last:mb-0 items-center'

const TodoItem: React.FC<TodoItemProps> = ({ item, depth }) => {
  const dispatch = useAppDispatch()
  const {} = useAppSelector(selectTodo)

  const [editing, setEditing] = React.useState(false)
  const [newText, setNewText] = React.useState(item.text)

  React.useEffect(() => {
    setNewText(item.text)
  }, [item.text])

  const handleCheck = React.useCallback(() => {
    dispatch(setChecked({ id: item.id, checked: !item.checked }))
  }, [dispatch, item.id, item.checked])

  const handleTextChange = React.useCallback(() => {
    const trimmed = newText.trim()
    if (trimmed.length > 0) {
      dispatch(setText({ id: item.id, text: trimmed }))
    } else {
      setNewText(item.text)
    }

    setEditing(false)
  }, [newText, dispatch, item.id, item.text])

  return (
    <div className={className} style={{ marginLeft: `${depth * 8}px` }}>
      <Checkbox checked={item.checked} onCheck={handleCheck} />

      {editing ? (
        <input
          autoFocus
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onBlur={() => {
            handleTextChange()
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleTextChange()
            }
          }}
          className='ml-2 outline-none border-none bg-transparent'
        />
      ) : (
        <>
          <div
            onClick={() => {
              if (!item.checked) {
                setEditing(true)
              }
            }}
            className={clsx(
              'ml-2 flex-1 cursor-text transition-all',
              item.checked &&
                'line-through text-sky-600 decoration-sky-400 cursor-default'
            )}
          >
            {item.text}
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem
