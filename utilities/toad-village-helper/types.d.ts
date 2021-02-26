import { FormattedCard } from "../../shared/toadvillage";

export interface DownloadInput {
  commanders: FormattedCard[];
  others: FormattedCard[];
  tokens: FormattedCard[];
}

export interface Transform {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
}

export interface ContainedObject {
  CardID: number;
  Name: string;
  Nickname: string;
  Transform: Transform;
}

export interface Deck {
  [id: number]: {
    FaceURL: string;
    BackURL: string;
    NumHeight: number;
    NumWidth: number;
    BackIsHidden: boolean;
  };
}

export interface TTSDeck {
  Name: string;
  CustomDeck: Deck;
  Transform: Transform;
  DeckIDs?: number[];
  ContainedObjects?: ContainedObject[];
  CardID?: number;
  Nickname?: string;
}

export interface TTSObjectStates {
  ObjectStates: TTSDeck[];
}

export interface File {
  name: string;
}
