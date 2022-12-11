import { Rarity, RoleName, Card } from '../../../shared/treachery'

const chooseN = (
  cardType: RoleName,
  rarity: Rarity,
  amount: number
): string[] => {
  const chosen: string[] = []
  const cards: string[] = ROLES[cardType][rarity]

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

const shuffle = (array: any[]): any[] => {
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

export const getCards = (numPlayers: number, rarity: Rarity): string[] => {
  let chosen: string[] = chooseN(RoleName.Leader, rarity, 1)

  if (numPlayers === 8) {
    chosen = chosen.concat(chooseN(RoleName.Traitor, rarity, 2))
  } else {
    chosen = chosen.concat(chooseN(RoleName.Traitor, rarity, 1))
  }

  if (numPlayers >= 6) {
    chosen = chosen.concat(chooseN(RoleName.Assassin, rarity, 3))
  } else {
    chosen = chosen.concat(chooseN(RoleName.Assassin, rarity, 2))
  }

  if (numPlayers >= 7) {
    chosen = chosen.concat(chooseN(RoleName.Guardian, rarity, 2))
  } else if (numPlayers >= 5) {
    chosen = chosen.concat(chooseN(RoleName.Guardian, rarity, 1))
  }

  return shuffle(chosen)
}

export const parseCardData = (card: string): Card => {
  const imgSrc = card
  const role: RoleName = card.split('/')[2] as RoleName
  const winCondition: string = WIN_CONDITIONS[role]
  return { imgSrc, role, winCondition }
}
