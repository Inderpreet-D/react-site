import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import Select from '../../atoms/Select'

import useSWR from '../../../hooks/useSWR'

const Page = () => {
  const [length, setLength] = React.useState(5)

  const { data: options, isLoading: isLoadingOptions } = useSWR<number[]>(
    'words'
  )
  const { data: word, isLoading: isLoadingWord } = useSWR<{ word: string }>(
    () => {
      if (!length || isLoadingOptions) {
        return null
      }

      return `words/${length}`
    }
  )

  return (
    <Container>
      <ContainerTitle>Wordle</ContainerTitle>

      {isLoadingOptions ? (
        <LoadingIcon />
      ) : (
        <Select
          label='Word Length'
          options={options.map(opt => `${opt}`)}
          value={length}
          onChange={e => setLength(+e.target.value)}
        />
      )}

      <div>{isLoadingWord ? 'Loading...' : `Word is ${word.word}`}</div>
    </Container>
  )
}

export default Page
