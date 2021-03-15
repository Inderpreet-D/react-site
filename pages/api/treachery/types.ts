import { Rarity } from "../../../shared/treachery";

export interface Payload {
  numPlayers?: number;
  rarity?: Rarity;
  roomCode?: string;
  id?: string;
}

export type JoinVal =
  | { error: string }
  | {
      roomCode: string;
      id: string;
      numPlayers: number;
      currentPlayers: number;
    };
