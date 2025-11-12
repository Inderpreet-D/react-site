import { wrapCall } from "..";

import {
  CreateResponse,
  RoomResponse,
  CardResponse,
  JoinResponse,
} from "../../../pages/api/treachery/types";

export const createRoom = async (numPlayers: number, rarity: string) => {
  const data = await wrapCall<CreateResponse>({
    method: "POST",
    uri: "/treachery/create",
    data: { numPlayers, rarity },
  });
  return data;
};

export const joinRoom = async (roomCode: string, id: string) => {
  const data = await wrapCall<JoinResponse>({
    method: "POST",
    uri: "/treachery/join",
    data: { roomCode, id },
  });
  return data;
};

export const waitRoom = async (roomCode: string) => {
  const data = await wrapCall<RoomResponse>({
    method: "POST",
    uri: "/treachery/room",
    data: { roomCode },
  });
  return data;
};

export const getCard = async (roomCode: string, id: string) => {
  const data = await wrapCall<CardResponse>({
    method: "POST",
    uri: "/treachery/card",
    data: { roomCode, id },
  });
  return data;
};
