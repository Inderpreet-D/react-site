import { FormattedCard } from '../../../shared/toadvillage'

export type DownloadInput = {
  commanders: FormattedCard[]
  others: FormattedCard[]
  tokens: FormattedCard[]
}

export type Transform = {
  posX: number
  posY: number
  posZ: number
  rotX: number
  rotY: number
  rotZ: number
  scaleX: number
  scaleY: number
  scaleZ: number
}

export type ContainedObject = {
  CardID: number
  Name: string
  Nickname: string
  Transform: Transform
  CustomDeck?: Deck
}

export type Deck = {
  [id: number]: {
    FaceURL: string
    BackURL: string
    NumHeight: number
    NumWidth: number
    BackIsHidden: boolean
  }
}

export type TTSDeck = {
  Name: string
  CustomDeck: Deck
  Transform: Transform
  DeckIDs?: number[]
  ContainedObjects?: ContainedObject[]
  CardID?: number
  Nickname?: string
}

export type TTSObjectStates = {
  ObjectStates: TTSDeck[]
}

export type File = {
  name: string
}
