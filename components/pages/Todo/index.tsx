import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import TodoItems from '../../molecules/TodoItems'
import TextInput from '../../atoms/TextInput'

import { selectTodo, loadTodos, saveTodos, addItem } from '../../../slices/todo'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

const Page = () => {
  const dispatch = useAppDispatch()
  const { loaded, loading, saving, dirty, items } = useAppSelector(selectTodo)

  const [newNote, setNewNote] = React.useState('')

  // Load todo items on page load
  React.useEffect(() => {
    if (!loaded) {
      dispatch(loadTodos())
    }
  }, [loaded, dispatch])

  // Save on change
  React.useEffect(() => {
    if (dirty) {
      dispatch(saveTodos())
    }
  }, [dirty, dispatch])

  return (
    <Container>
      <ContainerTitle>Todo</ContainerTitle>

      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className='flex flex-col'>
            {items.length > 0 ? (
              <TodoItems parent={null} depth={-1} />
            ) : (
              <div>No items yet.</div>
            )}
          </div>

          <TextInput
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder='Add new note...'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                dispatch(addItem({ text: newNote, parent: null }))
                setNewNote('')
              }
            }}
            className='flex w-1/2 mx-auto mt-8'
          />

          {saving && (
            <LoadingIcon
              className='absolute p-0 bottom-4 right-4'
              innerClass='w-8 h-8 border-[0.4rem]'
            />
          )}
        </>
      )}
    </Container>
  )
}

export default Page
