interface Room {
  numPlayers: number;
  currentPlayers: number;
  cards: string[];
  ids: {
    [x: string]: numgber;
  };
  nextIDX: number;
}

export interface Rooms {
  [x: string]: Room;
}
