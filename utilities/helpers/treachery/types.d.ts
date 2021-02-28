enum RoleName {
  Guardian = "Guardian",
  Assassin = "Assassin",
  Traitor = "Traitor",
  Leader = "Leader",
}

enum Rarity {
  Mythic = "Mythic",
  Rare = "Rare",
  Uncommon = "Uncommon",
}

interface Cards {
  [x: Rarity]: string[];
}

export interface Roles {
  [x: RoleName]: Cards;
}

export interface WinConditions {
  [x: RoleName]: string;
}
