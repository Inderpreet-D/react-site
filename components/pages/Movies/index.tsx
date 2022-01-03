import { Movie, Button } from './styles'
import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'

import useSWR from '../../../hooks/useSWR'

const Page = () => {
  const { data: movies, isLoading } = useSWR<string[]>('movies')

  const [movie, setMovie] = React.useState<null | string>(null)

  const pickMovie = React.useCallback(() => {
    const idx = Math.floor(Math.random() * movies.length)
    setMovie(movies[idx])
  }, [movies])

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
