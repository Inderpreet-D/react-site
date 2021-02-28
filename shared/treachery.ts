export interface Room {
  numPlayers: number;
  currentPlayers: number;
  cards: string[];
  ids: {
    [x: string]: number;
  };
  nextIDX: number;
}

export enum RoleName {
  Guardian = "Guardian",
  Assassin = "Assassin",
  Traitor = "Traitor",
  Leader = "Leader",
}

export interface Rooms {
  [x: string]: Room;
}

export enum Rarity {
  Mythic = "Mythic",
  Rare = "Rare",
  Uncommon = "Uncommon",
}

export interface Card {
  imgSrc: string;
  role: RoleName;
  winCondition: string;
}
