import axios from 'axios'

import { Card, FormattedCard, ReqCard } from '../../../shared/toadvillage'
import {
  ScryfallPart,
  ScryfallCard,
  MatchedCard,
  FetchResponse,
  BasicImage,
  CardFace,
  Deck,
  QueueType
} from './types'

const DELAY = 100

const SEARCH_URL = (name: string) =>
  `https://api.scryfall.com/cards/search?q=!"${name}"`

type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) => void

type FetchFunc<T> = (name: string) => PromiseExecutor<T>

// Gets a single card by name from Scryfall
const handleFetchCard: FetchFunc<ScryfallCard> = (name: string) => (
  resolve,
  reject
) => {
  setTimeout(async () => {
    try {
      const { data } = await axios.get(SEARCH_URL(name))
      const card = (data as unknown) as { data: ScryfallCard[] }
      resolve(card.data[0])
    } catch (err) {
      reject(err)
    }
  }, DELAY)
}

// Wrapper for fetch
const fetchCard = async (name: string) => {
  return new Promise<ScryfallCard>(handleFetchCard(name))
}

// Fetches a related token for a card from Scryfall
const fetchToken = async (uri: string): Promise<ScryfallCard> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const data = await axios.get(uri)
        resolve(data.data)
      } catch (err) {
        reject(err)
      }
    }, DELAY)
  })
}

// Fetches a list of
const fetchCards = async (cards: ReqCard[]): Promise<FetchResponse> => {
  const matchedCards: MatchedCard[] = []
  const unmatched: string[] = []
  const tokens: FormattedCard[] = []
  const neededTokens: ScryfallPart[] = []

  // Get each card and extra tokens if required
  await Promise.all(
    cards.map(async ({ amount, name }) => {
      try {
        const card: ScryfallCard = await fetchCard(name)
        matchedCards.push({ amount, card })

        card.all_parts
          ?.filter(({ component }) => component === 'token')
          .forEach(token => neededTokens.push(token))
      } catch (err) {
        console.error('Card Fetch Error: ', (err as Error).message)
        unmatched.push(name)
      }
    })
  )

  // Filtering out non-unique tokens
  const uniqueNeeded: { [uri: string]: ScryfallPart } = {}
  neededTokens.forEach(part => {
    if (!(part.uri in uniqueNeeded)) {
      uniqueNeeded[part.uri] = part
    }
  })

  // Get needed tokens
  await Promise.all(
    Object.values(uniqueNeeded).map(async ({ name, uri }) => {
      try {
        const token: ScryfallCard = await fetchToken(uri)
        tokens.push({
          amount: 1,
          card: { name, image: token.image_uris.normal }
        })
      } catch (err) {
        console.error('Token Fetch Error: ', (err as Error).message)
      }
    })
  )

  return { matchedCards, unmatched, tokens }
}

// Finds color identity for a list of cards
const getColorIdentity = (cards: MatchedCard[]): Set<string> => {
  const identity: Set<string> = new Set()
  cards.forEach(({ card }) => {
    card.color_identity.forEach((color: string) => identity.add(color))
  })
  return identity
}

// Checks if a card is a commander candidate
const isCommander = (
  deckIdentity: Set<string>,
  card: ScryfallCard
): boolean => {
  const types: string[] = card.type_line.split(' ')

  // Only Legendary Creature/Planeswlaker can be commander usually
  if (
    !types.includes('Legendary') ||
    (!types.includes('Creature') && !types.includes('Planeswalker'))
  ) {
    return false
  }

  // Check that the identity of this crd matches the identity of the deck
  const cardIdentity: Set<string> = new Set(card.color_identity)
  if (deckIdentity.size !== cardIdentity.size) {
    return false
  }
  for (let color of deckIdentity) {
    if (!cardIdentity.has(color)) {
      return false
    }
  }

  return true
}

// Convert Scryfall card to my own
const formatCard = (card: ScryfallCard): Card => {
  const image: BasicImage = card.image_uris || card.card_faces[0].image_uris
  const newCard: Card = { name: card.name, image: image.normal }

  // Add faces to card if needed
  if (card.card_faces) {
    const imageFaces: CardFace[] = card.card_faces.filter(
      face => face.image_uris
    )

    if (imageFaces.length === 2) {
      newCard.faces = imageFaces.map(({ name, image_uris }) => ({
        name,
        image: image_uris.normal
      }))
    }
  }

  return newCard
}

// Splits cards between commanders and normal
const formatCards = (cards: MatchedCard[], identity: Set<string>): Deck => {
  const commanders: FormattedCard[] = []
  const others: FormattedCard[] = []

  // Split cards
  cards.forEach(({ amount, card }) => {
    const formatted: Card = formatCard(card)
    const val: FormattedCard = { amount, card: formatted }

    if (isCommander(identity, card)) {
      commanders.push(val)
    } else {
      others.push(val)
    }
  })

  return { commanders, others }
}

// Combines cards based on name
const coalesce = (cards: FormattedCard[]): FormattedCard[] => {
  const coalesced: { [name: string]: FormattedCard } = {}

  // Update count
  cards.forEach(({ amount, card }) => {
    const { name } = card
    if (!(name in coalesced)) {
      coalesced[name] = { amount: 0, card }
    }
    coalesced[name].amount += amount
  })

  return Object.values(coalesced)
}

// Handles incoming request
const handleRequest = async (cardNames: ReqCard[]): Promise<QueueType> => {
  const { matchedCards, unmatched, tokens } = await fetchCards(cardNames)
  const filteredMatches: MatchedCard[] = matchedCards.filter(Boolean)
  const filteredUnmatches: string[] = unmatched.filter(Boolean)

  const identity: Set<string> = getColorIdentity(filteredMatches)
  const { commanders, others } = formatCards(filteredMatches, identity)

  return {
    status: 'DONE',
    commanders: coalesce(commanders),
    others: coalesce(others),
    tokens: coalesce(tokens),
    unmatched: [...new Set(filteredUnmatches)]
  }
}

export default handleRequest
