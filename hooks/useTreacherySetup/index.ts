import { useAppDispatch } from '../redux'

import { setup } from '../../slices/treachery'

const useTreacherySetup = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(setup())
  }, [dispatch])
}

export default useTreacherySetup
