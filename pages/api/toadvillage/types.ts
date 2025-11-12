import { FormattedCard, TreacheryResponse } from "../../../shared/toadvillage";

export interface ScryfallPart {
  component: string;
  name: string;
  uri: string;
}
export interface BasicImage {
  normal: string;
}

export interface CardFace {
  image_uris: BasicImage;
  name: string;
}

export interface ScryfallCard {
  all_parts?: ScryfallPart[];
  color_identity: string[];
  card_faces: CardFace[];
  image_uris: BasicImage;
  name: string;
  type_line: string;
  prices: { usd: string };
}

export interface MatchedCard {
  amount: number;
  card: ScryfallCard;
}

export interface FetchResponse {
  matchedCards: MatchedCard[];
  unmatched: string[];
  tokens: FormattedCard[];
}

export interface Deck extends Omit<TreacheryResponse, "tokens" | "unmatched"> {}

export type QueueType = { status: string } & TreacheryResponse;
