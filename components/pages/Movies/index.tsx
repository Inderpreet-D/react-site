import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import { Movie, Button } from './styles'

import useSWR from '../../../hooks/useSWR'

const Page = () => {
  const { data, isLoading } = useSWR('movies')

  const [movie, setMovie] = React.useState<null | string>(null)

  const pickMovie = React.useCallback(() => {
    const strData = data as string[]
    const idx = Math.floor(Math.random() * strData.length)
    setMovie(strData[idx])
  }, [data])

  return (
    <Container>
      <ContainerTitle>Movie Picker</ContainerTitle>

      {isLoading ? (
        <LoadingIcon />
      ) : (
        <Button onClick={pickMovie}>Get Movie</Button>
      )}

      {movie && <Movie>{movie}</Movie>}
    </Container>
  )
}

export default Page
