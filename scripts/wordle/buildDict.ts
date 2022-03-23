// Run with: npx ts-node --skipProject buildDict.ts

import fs from 'fs'
import os from 'os'

import { outputFolder } from '../../pages/api/words'

const LOWER_LENGTH_LIMIT = 3
const UPPER_LENGTH_LIMIT = 15
const SPLIT = os.EOL
const INPUT_FILE = './words_alpha.txt'
const getName = (key: string) => `${outputFolder}/${key}.json`

type DictType = {
  [x: number]: string[]
}

type CountType = {
  [x: number]: number
}

const filterWord = (word: string) => {
  const isWord = Boolean(word)
  const isCorrectLength =
    word.length >= LOWER_LENGTH_LIMIT && word.length <= UPPER_LENGTH_LIMIT
  return isWord && isCorrectLength
}

// Loads all words
const allWords = fs.readFileSync(INPUT_FILE).toString() as string

// Filter words by length
const words = allWords.split(SPLIT).filter(filterWord)
console.log({ words: words.length })

// Dictionary filling
const wordDict: DictType = {}

words.forEach(word => {
  const cleanedWord = word.trim().toLocaleLowerCase()
  const len = cleanedWord.length
  if (!(len in wordDict)) {
    wordDict[len] = []
  }
  wordDict[len].push(cleanedWord.toLocaleLowerCase())
})

// Word counts by length, for debugging
const counts: CountType = {}
Object.entries(wordDict).forEach(([key, val]) => {
  counts[+key] = val.length
})
console.log({ counts })

// Create folder if needed
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}

// Write all lists to disk
Object.entries(wordDict).forEach(([key, val]) => {
  fs.writeFileSync(getName(key), JSON.stringify(val))
})

console.log('Done')
