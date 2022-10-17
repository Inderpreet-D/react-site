import axios from 'axios'
import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import Select from '../../atoms/Select'
import WordleBoard from '../../molecules/WordleBoard'

import useSWR from '../../../hooks/useSWR'
import { start } from '../../../slices/wordle'

const Page = () => {
  const dispatch = useAppDispatch()

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
      dispatch(start(word))
      mounted && setFetched(true)
    }

    handleGetWord()

    return () => {
      mounted = false
    }
  }, [isLoadingOptions, fetched, length, dispatch])

  return (
    <Container>
      <ContainerTitle>Wordle</ContainerTitle>

      <div className='flex flex-col items-center'>
        {isLoadingOptions ? (
          <LoadingIcon />
        ) : (
          <Select
            label='Word Length'
            options={options.map(opt => `${opt}`)}
            value={length.toString()}
            onChange={val => setLength(+val)}
            className='mt-2 mb-4 mx-0'
          />
        )}

        <WordleBoard reset={() => setFetched(false)} />
      </div>
    </Container>
  )
}

export default Page
