import { StyledSelect, StyledHolder } from './styles'
import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import WordleBoard from '../../molecules/WordleBoard'

import useSWR from '../../../hooks/useSWR'

const Page = () => {
  const [length, setLength] = React.useState(5)

  const { data: options, isLoading: isLoadingOptions } = useSWR<number[]>(
    'words'
  )
  const { data: word, isLoading: isLoadingWord } = useSWR<{ word: string }>(
    () => {
      if (!length || isLoadingOptions || word) {
        return null
      }

      return `words/${length}`
    }
  )

  return (
    <Container>
      <ContainerTitle>Wordle</ContainerTitle>

      <StyledHolder>
        {isLoadingOptions ? (
          <LoadingIcon />
        ) : (
          <StyledSelect
            label='Word Length'
            options={options.map(opt => `${opt}`)}
            value={length}
            onChange={e => setLength(+e.target.value)}
          />
        )}

        <div>{isLoadingWord ? 'Loading...' : `Word is ${word.word}`}</div>

        <WordleBoard />
      </StyledHolder>
    </Container>
  )
}

export default Page
