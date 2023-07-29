import { Poem } from '../../../../../utilities/helpers/poetry/types'
import { RedditResponse } from '../../../../../shared/reddit'

import { reddit } from '../../../../../lib/api'
import parsePoems, {
  pickRandomPoem
} from '../../../../../utilities/helpers/poetry'

const useRedditPoems = () => {
  const [poem, setPoem] = React.useState<Poem | null>(null)
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (loaded) {
      return
    }

    ;(async () => {
      try {
        const res = await reddit()

        const poems = parsePoems(res as unknown as RedditResponse)
        const { name, body, url } = pickRandomPoem(poems)
        setLoaded(true)

        if (name && body && url) {
          setPoem({ name, body, url })
          return
        }

        setError(true)
      } catch (err) {
        setError(true)
        setLoaded(true)
      }
    })()
  }, [loaded])

  const reload = React.useCallback(() => {
    setLoaded(false)
    setError(false)
    setPoem(null)
  }, [])

  return { poem, loaded, error, reload }
}

export default useRedditPoems
