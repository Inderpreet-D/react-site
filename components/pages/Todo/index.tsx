import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import TodoItems from '../../molecules/TodoItems'
import TextInput from '../../atoms/TextInput'

import { selectTodo, loadTodos, saveTodos, addItem } from '../../../slices/todo'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

const Page = () => {
  const dispatch = useAppDispatch()
  const { loaded, items } = useAppSelector(selectTodo)

  const [newNote, setNewNote] = React.useState('')

  // Load todo items on page load
  React.useEffect(() => {
    if (!loaded) {
      dispatch(loadTodos())
    }
  }, [loaded, dispatch])

  // Save on change
  React.useEffect(() => {
    dispatch(saveTodos())
  }, [items, dispatch])

  return (
    <Container>
      <ContainerTitle>Todo</ContainerTitle>

      <div className='flex flex-col'>
        <TodoItems parent={null} depth={-1} />
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
    </Container>
  )
}

export default Page
