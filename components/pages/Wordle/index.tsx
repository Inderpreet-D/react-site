import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import LoadingIcon from '../../atoms/LoadingIcon'
import Select from '../../atoms/Select'
import WordleBoard from '../../molecules/WordleBoard'

import useSWR from '../../../hooks/useSWR'
import { start } from '../../../slices/wordle'
import { getRandomWord } from '../../../lib/api/wordle'

const Page = () => {
  const [length, setLength] = React.useState(5)

  const { data: options, isLoading: isLoadingOptions } =
    useSWR<number[]>('words')

  const { reload } = useWordleSetup(isLoadingOptions, length)

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
            onChange={val => {
              setLength(+val)
              // Trigger re-fetch when length changes
              reload()
            }}
            className='mt-2 mb-4 mx-0'
          />
        )}

        <WordleBoard reset={() => reload()} />
      </div>
    </Container>
  )
}

export default Page

const useWordleSetup = (isLoadingOptions: boolean, length: number) => {
  const dispatch = useAppDispatch()

  const [fetched, setFetched] = React.useState(false)

  // Fetche new word when required
  React.useEffect(() => {
    if (isLoadingOptions || fetched) {
      return
    }

    // Fetch new word
    ;(async () => {
      const word = await getRandomWord(length)
      dispatch(start(word))
      setFetched(true)
    })()
  }, [isLoadingOptions, fetched, length, dispatch])

  const reload = React.useCallback(() => {
    setFetched(false)
  }, [])

  return { reload }
}
