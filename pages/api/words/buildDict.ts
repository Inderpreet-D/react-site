// Run with: npx ts-node --skipProject buildDict.ts

import fs from 'fs'

import { outputFolder } from '.'

const inputFile = './words_alpha.txt'
const getName = (key: string) => `${outputFolder}/${key}.json`

type DictType = {
  [x: number]: string[]
}

type CountType = {
  [x: number]: number
}

// Loads all words
const allWords = fs.readFileSync(inputFile).toString() as string

// Filter words by length
const words = allWords
  .split('\r\n')
  .filter(word => Boolean(word) && word.length > 1)
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
