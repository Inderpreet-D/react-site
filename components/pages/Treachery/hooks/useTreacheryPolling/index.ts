import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'

import {
  State,
  selectTreachery,
  waitForRoom
} from '../../../../../slices/treachery'

const useTreacheryPolling = () => {
  const dispatch = useAppDispatch()

  const { state } = useAppSelector(selectTreachery)

  React.useEffect(() => {
    if (state !== State.Room) {
      return
    }

    const roomFillInterval = setInterval(() => dispatch(waitForRoom()), 1000)

    return () => {
      clearInterval(roomFillInterval)
    }
  }, [state, dispatch])
}

export default useTreacheryPolling
