export interface ReqCard {
  amount: number
  name: string
}

export interface ScryfallPart {
  component: string
  name: string
  uri: string
}

export interface ScryfallCard {
  all_parts?: ScryfallPart[]
  color_identity: string[]
  card_faces: {
    image_uris: {
      normal: string
    }
    name: string
  }[]
  image_uris: {
    normal: string
  }
  name: string
  type_line: string
}

export interface MatchedCard {
  amount: number
  card: ScryfallCard
}
