import { Rarity, RoleName, Card } from '../../../../shared/treachery'
import { getRoles, getWinConditions } from './storage'

export const generateUniqueCode = (codeSet: string[] = []) => {
  let code = ''
  do {
    code = ''

    // Create code
    for (let i = 0; i < 4; i++) {
      code += String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }
  } while (codeSet.includes(code))

  // Return unique code
  return code
}

const chooseN = async (cardType: RoleName, rarity: Rarity, amount: number) => {
  const roles = await getRoles()
  const chosen: string[] = []
  const cards: string[] = roles[cardType][rarity]

  while (chosen.length != amount) {
    const item = `/treachery/${cardType}/${rarity}/${
      cards[Math.floor(Math.random() * cards.length)]
    }`

    if (!chosen.includes(item)) {
      chosen.push(item)
    }
  }

  return chosen
}

const shuffle = <T>(array: T[]) => {
  let curr = array.length

  while (curr !== 0) {
    const rand = Math.floor(Math.random() * curr)
    curr -= 1

    const temp = array[curr]
    array[curr] = array[rand]
    array[rand] = temp
  }

  return array
}

export const getCards = async (numPlayers: number, rarity: Rarity) => {
  let chosen = await chooseN(RoleName.Leader, rarity, 1)

  if (numPlayers === 8) {
    chosen = chosen.concat(await chooseN(RoleName.Traitor, rarity, 2))
  } else {
    chosen = chosen.concat(await chooseN(RoleName.Traitor, rarity, 1))
  }

  if (numPlayers >= 6) {
    chosen = chosen.concat(await chooseN(RoleName.Assassin, rarity, 3))
  } else {
    chosen = chosen.concat(await chooseN(RoleName.Assassin, rarity, 2))
  }

  if (numPlayers >= 7) {
    chosen = chosen.concat(await chooseN(RoleName.Guardian, rarity, 2))
  } else if (numPlayers >= 5) {
    chosen = chosen.concat(await chooseN(RoleName.Guardian, rarity, 1))
  }

  return shuffle(chosen)
}

export const parseCardData = async (card: string) => {
  const WinConditions = await getWinConditions()
  const imgSrc = card
  const role: RoleName = card.split('/')[2] as RoleName
  const winCondition: string = WinConditions[role]
  const parsedCard: Card = { imgSrc, role, winCondition }
  return parsedCard
}
