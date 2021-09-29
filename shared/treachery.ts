export type Room = {
  numPlayers: number
  currentPlayers: number
  cards: string[]
  ids: {
    [x: string]: number
  }
  nextIDX: number
}

export enum RoleName {
  Guardian = 'Guardian',
  Assassin = 'Assassin',
  Traitor = 'Traitor',
  Leader = 'Leader'
}

export type Rooms = {
  [x: string]: Room
}

export enum Rarity {
  Mythic = 'Mythic',
  Rare = 'Rare',
  Uncommon = 'Uncommon'
}

export type Card = {
  imgSrc: string
  role: RoleName
  winCondition: string
}
