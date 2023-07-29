import parse from 'html-react-parser'
import clsx from 'clsx'

import Container from '../../atoms/Container'
import LoadingIcon from '../../atoms/LoadingIcon'
import Button from '../../atoms/Button'

import useRedditPoems from './hooks/useRedditPoems'

const titleClassName =
  'flex justify-center text-4xl font-bold tracking-wide text-primary-light'

const Page = () => {
  const { poem, loaded, error, reload } = useRedditPoems()

  return (
    <Container>
      {!loaded ? (
        <LoadingIcon />
      ) : error ? (
        <div className={titleClassName}>
          An error occurred, please try again later.
        </div>
      ) : (
        poem && (
          <>
            <a
              href={poem.url}
              target='_blank'
              rel='noreferrer'
              data-cy='title'
              className={clsx(titleClassName, 'mb-4')}
            >
              {poem.name}
            </a>

            <div
              dangerouslySetInnerHTML={{ __html: parse(poem.body).toString() }}
              className='text-xl font-medium tracking-wide'
            />

            <Button onClick={() => reload()} className='mt-8 mx-auto'>
              Refresh
            </Button>
          </>
        )
      )}
    </Container>
  )
}

export default Page
