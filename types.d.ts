//* Common
type KVPair = Record<string, string>
type ID = string

type FullUser = Omit<
  User,
  'hashedPassword' | 'iterations' | 'profile' | 'salt'
> & {
  profile: Omit<Profile, 'id'>
}

//* Authentication
type Locals = {
  locals: {
    token: string | null
    user: User | null
  }
}

type Profile = {
  id: ID
}

type ProfilesTable = Record<ID, Profile>

type Token = ID[]

type TokensTable = Record<ID, Token>

type User = {
  hashedPassword: string
  id: ID
  iterations: number
  name: string
  profile: ID
  salt: string
}

type UsersTable = Record<ID, User>

type AuthenticationTable = {
  profiles: ProfilesTable
  tokens: TokensTable
  users: UsersTable
}

//* Competitive
type CompetitiveGame = {
  day: number
  month: number
  players: KVPair
  winner?: string
}

type CompetitiveSeason = {
  games: CompetitiveGame[]
  name: string
  rules: string[]
  year: number
}

type CompetitiveTable = CompetitiveSeason[]

//* Movies
type MoviesTable = KVPair

//* Todos
type TodoItem = {
  checked: boolean
  id: ID
  order: number
  text: string
}

type TodosTable = Record<ID, TodoItem>

//* Treachery
type Room = {
  numPlayers: number
  currentPlayers: number
  cards: string[]
  ids: Record<string, number>
  nextIDX: number
}

type Rooms = Record<string, Room>

type TreacheryTable = {
  rooms: string[]
  room: Rooms
}

//* Full DB
type DBSchema = {
  authentication: AuthenticationTable
  competitive: CompetitiveTable
  movies: MoviesTable
  recordPassword: string
  todos: TodosTable
  treachery: TreacheryTable
}
