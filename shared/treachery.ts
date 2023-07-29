export enum RoleName {
  Guardian = 'Guardian',
  Assassin = 'Assassin',
  Traitor = 'Traitor',
  Leader = 'Leader'
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
