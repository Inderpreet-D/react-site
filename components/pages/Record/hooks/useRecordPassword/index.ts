import { checkPassword } from '../../../../../lib/api/competitive'

const useRecordPassword = (password: string) => {
  const [passValid, setPassValid] = React.useState(false)

  // Checks password
  React.useEffect(() => {
    ;(async () => {
      try {
        const match = await checkPassword(password)
        setPassValid(match)
      } catch (err) {
        console.error('Error checking password', err)
      }
    })()
  }, [password])

  return passValid
}

export default useRecordPassword
