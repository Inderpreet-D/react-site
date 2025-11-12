import { wrapCall } from "..";

import { Game } from "../../../components/pages/Competitive";

export const getSeasons = async () => {
  const { seasons } = await wrapCall<{ seasons: string[] }>({
    method: "GET",
    uri: "/record/seasons",
  });
  return seasons;
};

export const postSeason = async (name: string) => {
  const { seasons } = await wrapCall<{ seasons: string[] }>({
    method: "POST",
    uri: "/record/seasons",
    data: { name },
  });
  return seasons;
};

export const postRecord = async (season: string, game: Game) => {
  return await wrapCall({
    method: "POST",
    uri: "/record",
    data: { season, game },
  });
};
