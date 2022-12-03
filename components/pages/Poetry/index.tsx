import parse from 'html-react-parser'
import clsx from 'clsx'

import { Poem } from '../../../utilities/helpers/poetry/types'

import Container from '../../atoms/Container'
import LoadingIcon from '../../atoms/LoadingIcon'
import Button from '../../atoms/Button'

import { reddit } from '../../../lib/api'
import parsePoems, { pickRandomPoem } from '../../../utilities/helpers/poetry'
import { RedditResponse } from '../../../shared/reddit'

const titleClassName =
  'flex justify-center text-4xl font-bold tracking-wide text-primary-light'

const Page = () => {
  const [poem, setPoem] = React.useState<Poem | null>(null)
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (loaded) {
      return
    }

    const handleFetch = async () => {
      try {
        const res = await reddit()

        const poems = parsePoems(res as unknown as RedditResponse)
        const { name, body, url } = pickRandomPoem(poems)

        if (name && body && url) {
          setPoem({ name, body, url })
        } else {
          setError(true)
        }

        setLoaded(true)
      } catch (err) {
        setError(true)
        setLoaded(true)
      }
    }

    handleFetch()
  }, [loaded])

  return (
    <Container>
      {!loaded ? (
        <LoadingIcon />
      ) : error ? (
        <div className={titleClassName}>
          An error occurred, please try again later.
        </div>
      ) : (
        <>
          <a
            href={poem?.url!}
            target='_blank'
            rel='noreferrer'
            data-cy='title'
            className={clsx(titleClassName, 'mb-4')}
          >
            {poem?.name}
          </a>

          <div
            dangerouslySetInnerHTML={{ __html: parse(poem?.body!).toString() }}
            className='text-xl font-medium tracking-wide'
          />

          <Button onClick={() => setLoaded(false)} className='mt-8 mx-auto'>
            Refresh
          </Button>
        </>
      )}
    </Container>
  )
}

export default Page
