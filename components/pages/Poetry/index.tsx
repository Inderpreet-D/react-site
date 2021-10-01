import axios from 'axios'
import parse from 'html-react-parser'

import Container from '../../atoms/Container'
import LoadingIcon from '../../atoms/LoadingIcon'
import { StyledError, StyledLink, StyledText } from './styles'

import parsePoems, { pickRandomPoem } from '../../../utilities/helpers/poetry'

const Page = () => {
  const [poem, setPoem] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get('/api/reddit')

        const poems = parsePoems(res)
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
  }, [])

  return (
    <Container>
      {!loaded ? (
        <LoadingIcon />
      ) : error ? (
        <StyledError>An error occurred, please try again later.</StyledError>
      ) : (
        <>
          <StyledLink href={poem.url} target='_blank'>
            {poem.name}
          </StyledLink>

          <StyledText dangerouslySetInnerHTML={{ __html: parse(poem.body) }} />
        </>
      )}
    </Container>
  )
}

export default Page
