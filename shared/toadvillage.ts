export interface Card {
  name: string
  image: string
  faces?: { name: string; image: string }[]
  prices: { usd: string }
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

export interface ReqCard {
  amount: number
  name: string
}
