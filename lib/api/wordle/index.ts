import { wrapCall } from '..'

export const checkValidWord = async (guess: string) => {
  const { valid } = await wrapCall<{ valid: boolean }>({
    method: 'GET',
    uri: `/words/valid/${guess}`
  })
  return valid
}

export const getRandomWord = async (length: number) => {
  const { word } = await wrapCall<{ word: string }>({
    method: 'GET',
    uri: `/words/${length}`
  })
  return word
}
