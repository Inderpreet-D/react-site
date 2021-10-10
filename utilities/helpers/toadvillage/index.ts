import generate from 'project-name-generator'

import { FormattedCard, Card } from '../../../shared/toadvillage'
import {
  DownloadInput,
  Transform,
  ContainedObject,
  Deck,
  TTSDeck,
  TTSObjectStates,
  File
} from './types'

const getTransform = (
  posX: number,
  rotZ: number,
  posY: number = 0
): Transform => ({
  posX,
  posY,
  posZ: 0,
  rotX: 0,
  rotY: 180,
  rotZ,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
})

const listAsDeck = (
  list: FormattedCard[],
  idx: number,
  hasFaces: boolean = false
): TTSDeck => {
  const rotZ: number = idx === 0 ? 180 : 0

  const contained: ContainedObject[] = []
  const ids: number[] = []
  const deck: Deck = {}
  let deckId: number = 1

  const cardToTTS = (card: Card, id: number): void => {
    contained.push({
      CardID: id,
      Name: 'Card',
      Nickname: card.name,
      Transform: getTransform(0, rotZ)
    })

    deck[deckId] = {
      FaceURL: hasFaces ? card.faces![0].image : card.image,
      BackURL: hasFaces
        ? card.faces![1].image
        : 'https://i.redd.it/25zhw3vvkvn41.png',
      NumHeight: 1,
      NumWidth: 1,
      BackIsHidden: true
    }

    deckId++
    ids.push(id)
  }

  let currentID = 100
  list.forEach(({ amount, card }) => {
    for (let i = 0; i < amount; i++) {
      cardToTTS(card, currentID)
      currentID += 100
    }
  })

  const deckTransform: Transform = getTransform(2.4 * idx, rotZ, 1)
  if (list.length > 1) {
    return {
      Name: 'DeckCustom',
      CustomDeck: deck,
      Transform: deckTransform,
      DeckIDs: ids,
      ContainedObjects: contained
    }
  } else {
    return {
      Name: 'Card',
      CustomDeck: deck,
      Transform: deckTransform,
      CardID: 100,
      Nickname: list[0].card.name
    }
  }
}

const hasFace = (card: FormattedCard): boolean => card.card.faces?.length === 2

const convertToTTS = (cardObjs: DownloadInput): string => {
  const flipCards: FormattedCard[] = [
    ...cardObjs.others.filter(hasFace),
    ...cardObjs.commanders.filter(hasFace)
  ]

  const allCards: FormattedCard[][] = [
    cardObjs.others,
    cardObjs.commanders,
    flipCards,
    cardObjs.tokens
  ].filter((list: FormattedCard[]) => Boolean(list) && list.length > 0)

  const states: TTSDeck[] = []
  let nextNum: number = 0

  allCards.forEach((cardList, i) => {
    const deck: TTSDeck = listAsDeck(cardList, nextNum, cardList === flipCards)
    if (i !== 0) {
      const newDeck: TTSDeck = { ...deck }

      if (newDeck.DeckIDs) {
        newDeck.DeckIDs = newDeck.DeckIDs.reverse()
      }

      if (newDeck.ContainedObjects) {
        newDeck.ContainedObjects = newDeck.ContainedObjects.reverse()
      }

      states.push(newDeck)
    } else {
      states.push(deck)
    }

    nextNum++
  })

  const obj: TTSObjectStates = { ObjectStates: states.filter(Boolean) }

  return JSON.stringify(obj)
}

export const downloadBlob = (blob: Blob, name: string): void => {
  const el: HTMLAnchorElement = document.createElement('a')
  el.href = URL.createObjectURL(blob)
  el.download = name
  document.body.appendChild(el)
  el.click()
}

const download = (cardObjs: DownloadInput, name: string): string | void => {
  if (cardObjs.others) {
    if (cardObjs.others.length === 0) {
      return "You're missing a deck"
    } else {
      const blob: Blob = new Blob([convertToTTS(cardObjs)], {
        type: 'application/json'
      })
      downloadBlob(blob, `${name}.json`)
    }
  } else {
    return 'You must build a deck before downloading'
  }
}

export const randomName = (): string => {
  const random: string[] = generate({ words: 4, alliterative: false })
    .raw as string[]
  const upped = random.map(
    (val: string) => val.charAt(0).toUpperCase() + val.slice(1)
  )
  return upped.join('')
}

export const nameSort = (c1: FormattedCard, c2: FormattedCard): number => {
  const textA = c1.card.name
  const textB = c2.card.name

  if (textA < textB) {
    return -1
  } else if (textA > textB) {
    return 1
  } else {
    return c1.amount - c2.amount
  }
}

export const downloadDecklist = (list: string[], file: File): void => {
  const fullName: string[] = file.name.split('.')
  fullName.splice(fullName.length - 1, 1, 'LIST', 'txt')

  const newName: string = fullName.join('.')
  const blob: Blob = new Blob([list.join('\n')], { type: 'text/plain' })

  downloadBlob(blob, newName)
}

export const parseJSON = (data: TTSObjectStates): string[] => {
  const listObj: { [x: string]: number } = {}

  const addCard = ({
    Nickname,
    CustomDeck
  }: TTSDeck | ContainedObject): void => {
    if (!(Nickname! in listObj)) {
      listObj[Nickname!] = 0
    }

    let amount = 1
    if (CustomDeck) {
      amount = Object.keys(CustomDeck).length
    }

    listObj[Nickname!] += amount
  }

  const { ObjectStates } = data
  addCard(ObjectStates[1])
  try {
    ObjectStates![0].ContainedObjects!.forEach(addCard)
  } catch (e) {
    addCard(ObjectStates[0])
  }

  const kvSort = (a: [string, number], b: [string, number]): -1 | 1 | 0 => {
    if (a[0] < b[0]) {
      return -1
    } else if (a[0] > b[0]) {
      return 1
    } else {
      return 0
    }
  }

  const deckList = Object.entries(listObj)
    .sort(kvSort)
    .map(([key, value]) => `${value} ${key}`)

  return deckList
}

export default download
