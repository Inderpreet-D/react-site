import axios from 'axios'

import { StyledSelect, StyledHolder } from './styles'
import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import WordleBoard from '../../molecules/WordleBoard'

import useSWR from '../../../hooks/useSWR'
import { useWordleState } from '../../../providers/WordleStateProvider'

const Page = () => {
  const { startGame } = useWordleState()

  const [length, setLength] = React.useState(5)
  const [fetched, setFetched] = React.useState(false)

  const { data: options, isLoading: isLoadingOptions } = useSWR<number[]>(
    'words'
  )

  // Trigger re-fetch when length changes
  React.useEffect(() => {
    setFetched(false)
  }, [length])

  // Fetche new word when required
  React.useEffect(() => {
    if (isLoadingOptions || fetched) {
      return
    }

    let mounted = true

    // Fetch new word
    const handleGetWord = async () => {
      const wordResponse = (await axios.get(`/api/words/${length}`)) as {
        data: { word: string }
      }
      const word = wordResponse.data.word
      startGame(word)
      mounted && setFetched(true)
    }

    handleGetWord()

    return () => {
      mounted = false
    }
  }, [isLoadingOptions, fetched, length, startGame])

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

        <WordleBoard />
      </StyledHolder>
    </Container>
  )
}

export default Page
