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
    <>
      {!isLoadingOptions &&
        options.map(num => (
          <div key={num} onClick={() => setLength(num)}>
            {num}
          </div>
        ))}

      <div>{isLoadingWord ? 'Loading...' : `Word is ${word.word}`}</div>
    </>
  )
}

export default Page
