export interface Card {
  name: string
  image: string
  faces?: { name: string; image: string }[]
}

export interface FormattedCard {
  amount: number
  card: Card
}
