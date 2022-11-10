import { FaCheck } from '@react-icons/all-files/fa/FaCheck'
import { FaTimes } from '@react-icons/all-files/fa/FaTimes'
import { FaPencilAlt } from '@react-icons/all-files/fa/FaPencilAlt'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'

import IconButton from '../../../atoms/IconButton'

import { selectAuth, updateName } from '../../../../slices/auth'
import TextInput from '../../../atoms/TextInput'

const Username = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(selectAuth)

  const [editing, setEditing] = React.useState(false)
  const [name, setName] = React.useState('')

  const startEdit = React.useCallback(() => {
    setEditing(true)
    setName(user!.name)
  }, [user])

  const cancelEdit = React.useCallback(() => {
    setEditing(false)
    setName('')
  }, [])

  const confirmChange = React.useCallback(() => {
    dispatch(updateName(name.trim()))
    cancelEdit()
  }, [dispatch, name, cancelEdit])

  return (
    <div className='flex justify-center items-center'>
      <div className='text-4xl'>Username:</div>

      {editing ? (
        <>
          <TextInput
            autoFocus
            placeholder='New Username'
            value={name}
            onChange={e => setName(e.target.value.trim())}
            className='ml-4'
          />

          <IconButton
            disabled={name.trim().length === 0 || name.trim() === user!.name}
            Icon={FaCheck}
            onClick={confirmChange}
            className='ml-4'
          />

          <IconButton Icon={FaTimes} onClick={cancelEdit} className='ml-4' />
        </>
      ) : (
        <>
          <div className='text-4xl ml-4'>{user!.name}</div>

          <IconButton Icon={FaPencilAlt} onClick={startEdit} className='ml-4' />
        </>
      )}
    </div>
  )
}

export default Username
