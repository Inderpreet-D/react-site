export interface Card {
  name: string
  image: string
  faces?: { name: string; image: string }[]
}

export interface FormattedCard {
  amount: number
  card: Card
}

export interface TreacheryResponse {
  commanders: FormattedCard[]
  others: FormattedCard[]
  tokens: FormattedCard[]
  unmatched: string[]
}
