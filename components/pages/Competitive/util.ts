import { Season } from '.'

const s: Season[] = [
  {
    games: [
      {
        day: 3,
        month: 1,
        players: {
          Gary: 'Old Rutstein - Elf Tribal - Umori Companion',
          Inderpreet: 'Queen Merchesa - Assassin Theme',
          Richard: 'Kadena, Slinking Sorcerer - Morph Theme'
        },
        winner: 'Richard'
      }
    ],
    name: 'Season 1',
    rules: [
      'BAN: Sliver tribal decks are banned',
      'BAN: Angel tribal decks are banned',
      'BAN: Artifact theme decks are banned',
      'GENERAL: 5 takebacks are allowed per player, per game, after that all misplays are final',
      'GENERAL: $1500 limit on decks',
      'GENERAL: Games will be declared a stalemate 120 minutes after they start'
    ],
    year: 2022
  }
]
