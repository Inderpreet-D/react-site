import { Movie, Button } from './styles'
import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'

import useSWR from '../../../hooks/useSWR'

const Page = () => {
  const { data: moviesList, isLoading: isLoadingMovies } = useSWR<string[]>(
    'movies'
  )

  const [movie, setMovie] = React.useState<null | string>(null)

  const { data: movieInfo } = useSWR<any>(() => {
    if (!movie) {
      return null
    }

    return `/movies/${movie}`
  })

  const pickMovie = React.useCallback(() => {
    const idx = Math.floor(Math.random() * moviesList.length)
    setMovie(moviesList[idx])
  }, [moviesList])

  return (
    <Container>
      <ContainerTitle>Movie Picker</ContainerTitle>

      <Button onClick={pickMovie} disabled={isLoadingMovies}>
        Get Movie
      </Button>

      {isLoadingMovies && <LoadingIcon />}

      {movie && <Movie>{movie}</Movie>}

      {movieInfo && <div>{JSON.stringify(movieInfo)}</div>}
    </Container>
  )
}

export default Page
