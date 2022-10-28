//* Common
type KVPair = Record<string, string>
type ID = string

//* Authentication
type Account = {
  userID: ID
  hashedPassword: string
  salt: string
}

type AccountsTable = Record<ID, Account>

type Token = ID[]

type TokensTable = Record<ID, Token>

type User = {
  name: string
}

type UsersTable = Record<ID, User>

type AuthenticationTable = {
  accounts: AccountsTable
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

//* Full DB
type DBSchema = {
  authentication: AuthenticationTable
  competitive: CompetitiveTable
  movies: MoviesTable
  recordPassword: string
  todos: TodosTable
}
