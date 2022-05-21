import { DivProps } from 'react-html-props'
import clsx from 'clsx'

import { MdAdd } from '@react-icons/all-files/md/MdAdd'
import { MdDelete } from '@react-icons/all-files/md/MdDelete'

import { TodoItem as TodoItemType } from '../../../shared/todo'

import Checkbox from '../Checkbox'

import {
  addItem,
  removeItem,
  selectTodo,
  setChecked,
  setText
} from '../../../slices/todo'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import TextInput from '../TextInput'

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
  const [hovering, setHovering] = React.useState(false)
  const [addingNew, setAddingNew] = React.useState(false)
  const [newItemText, setNewItemText] = React.useState('')

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

  const finishAddingNew = React.useCallback(() => {
    setAddingNew(false)
    setNewItemText('')
  }, [])

  const handleAdd = React.useCallback(() => {
    const trimmed = newItemText.trim()
    if (trimmed.length > 0) {
      dispatch(addItem({ text: newItemText, parent: item.id }))
      finishAddingNew()
    }
  }, [dispatch, newItemText, item.id, finishAddingNew])

  const handleDelete = React.useCallback(() => {
    dispatch(removeItem(item.id))
  }, [dispatch, item.id])

  const depthAdjust = React.useMemo(() => depth * 16, [depth])

  return (
    <>
      <div className={className} style={{ marginLeft: `${depthAdjust}px` }}>
        <Checkbox checked={item.checked} onCheck={handleCheck} />

        {editing ? (
          <input
            autoFocus
            value={newText}
            onChange={e => setNewText(e.target.value)}
            onBlur={() => handleTextChange()}
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
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={clsx(
                'ml-2 flex items-center flex-1 cursor-text transition-all',
                item.checked &&
                  'line-through text-sky-600 decoration-sky-400 cursor-default'
              )}
            >
              {item.text}

              {hovering && (
                <div className='ml-4 text-white flex items-center'>
                  <MdAdd
                    onClick={e => {
                      e.stopPropagation()
                      setAddingNew(true)
                    }}
                    className='cursor-pointer'
                  />

                  <MdDelete
                    onClick={e => {
                      e.stopPropagation()
                      handleDelete()
                    }}
                    className='ml-2 cursor-pointer'
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {addingNew && (
        <TextInput
          autoFocus
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
          onBlur={() => finishAddingNew()}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleAdd()
            }
          }}
          placeholder='Add new sub-note'
          className='mb-4'
          style={{ marginLeft: `${depthAdjust}px` }}
        />
      )}
    </>
  )
}

export default TodoItem
