import { useAppDispatch } from '../../../../../hooks/redux'

import { restart } from '../../../../../slices/wordle'

const useWordleSetup = (isLoadingOptions: boolean) => {
  const dispatch = useAppDispatch()

  const [length, setLength] = React.useState(5)

  const reload = React.useCallback(() => {
    dispatch(restart(length))
  }, [dispatch, length])

  // Fetches new word when required
  React.useEffect(() => {
    if (isLoadingOptions) {
      return
    }

    reload()
  }, [isLoadingOptions, reload])

  return { reload, length, setLength }
}

export default useWordleSetup
