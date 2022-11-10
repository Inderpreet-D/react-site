import { useAppDispatch } from '../../../../hooks/redux'

import Button from '../../../atoms/Button'

import { updatePassword } from '../../../../slices/auth'
import TextInput from '../../../atoms/TextInput'

const Password = () => {
  const dispatch = useAppDispatch()

  const [editing, setEditing] = React.useState(false)
  const [newPass, setNewPass] = React.useState('')
  const [confirm, setConfirm] = React.useState('')

  const canSave = React.useMemo(() => {
    return newPass === confirm && newPass.length >= 6
  }, [newPass, confirm])

  const error = React.useMemo(() => {
    if (newPass.length === 0 && confirm.length === 0) {
      return null
    }

    if (newPass !== confirm) {
      return 'Passwords must match'
    }

    if (newPass.length < 6) {
      return 'Password must be at least 6 characters'
    }

    return null
  }, [newPass, confirm])

  const startEdit = React.useCallback(() => {
    setEditing(true)
  }, [])

  const cancelEdit = React.useCallback(() => {
    setEditing(false)
    setNewPass('')
    setConfirm('')
  }, [])

  const confirmChange = React.useCallback(() => {
    dispatch(updatePassword(newPass))
    cancelEdit()
  }, [dispatch, newPass, cancelEdit])

  return (
    <div className='mt-8 flex flex-col justify-center'>
      {editing && error && (
        <div className='mb-4 text-red-500 text-lg font-medium'>{error}</div>
      )}

      {editing && (
        <>
          <TextInput
            autoFocus
            placeholder='New Password'
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            className='mb-4'
          />

          <TextInput
            placeholder='Confirm New Password'
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className='mb-4'
          />
        </>
      )}

      <div className='flex items-center'>
        {editing ? (
          <>
            <Button onClick={confirmChange} disabled={!canSave}>
              Save
            </Button>

            <Button onClick={cancelEdit} className='ml-4'>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={startEdit}>Change Password</Button>
        )}
      </div>
    </div>
  )
}

export default Password
