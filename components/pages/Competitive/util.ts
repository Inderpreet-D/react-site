import { Game, Season } from '.'

// G -> Tribe
// T -> Theme
// C -> Companion

const g: Game = {
  day: 10,
  month: 1,
  players: {
    Gary: '',
    Inderpreet: '',
    Richard: ''
  },
  winner: ''
}

const s: Season[] = [
  {
    games: [
      {
        day: 3,
        month: 1,
        players: {
          Gary: 'Old Rutstein -- G::Elf -- C::Umori, the Collector',
          Inderpreet: 'Queen Marchesa -- T::Assassin',
          Richard: 'Kadena, Slinking Sorcerer -- T::Morph'
        },
        winner: 'Richard'
      },
      g
    ],
    name: 'Season 1',
    rules: [
      'BAN::Sliver tribal decks are banned',
      'BAN::Angel tribal decks are banned',
      'BAN::Artifact theme decks are banned',
      'GENERAL::5 takebacks are allowed per player, per game, after that all misplays are final',
      'GENERAL::$1500 limit on decks',
      'GENERAL::Games will be declared a stalemate 120 minutes after they start',
      'GENERAL::Banned decks list will be updated as more games are played',
      'GENERAL::Cards that are banned on the [official banlist](https://mtgcommander.net/index.php/banned-list) are not allowed in these games'
    ],
    year: 2022
  }
]

export default s
