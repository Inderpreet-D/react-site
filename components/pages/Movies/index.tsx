import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import Button from '../../atoms/Button'
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

  if (isLoadingMovies) {
    return null
  }

  return (
    <Container>
      <ContainerTitle>Movie Picker</ContainerTitle>

      <Button
        onClick={pickMovie}
        disabled={isLoadingMovies}
        className='mx-auto my-0'
      >
        Get Movie
      </Button>

      {isLoadingMovies && <LoadingIcon />}

      {movie && (
        <div className='mt-8 mb-4 mx-0 text-center text-5xl underline text-sky-400'>
          {movie}
        </div>
      )}

      {movieInfo && <div>{JSON.stringify(movieInfo)}</div>}
    </Container>
  )
}

export default Page
