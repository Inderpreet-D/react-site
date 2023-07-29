import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'

import { getSeasons } from '../../../../lib/api/competitive'
import { selectMTGRecord, setSeasons } from '../../../../slices/mtgRecord'

const useRecordSeasons = () => {
  const dispatch = useAppDispatch()

  const { seasonsLoaded } = useAppSelector(selectMTGRecord)

  React.useEffect(() => {
    if (seasonsLoaded) {
      return
    }

    ;(async () => {
      try {
        const seasons = await getSeasons()
        dispatch(setSeasons(seasons))
      } catch (err) {
        console.error('Error getting seasons', err)
      }
    })()
  }, [seasonsLoaded, dispatch])

  return null
}

export default useRecordSeasons
