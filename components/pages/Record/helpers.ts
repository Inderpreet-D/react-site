import { Players } from "../../../slices/mtgRecord/helpers";
import { PlayerObj } from "../Competitive";

export const getPlayerObj = (players: Players) => {
  const playerObj: PlayerObj = {};

  Object.values(players).forEach((vals) => {
    const { name, commander, theme, tribe, companion } = vals;

    if (commander.length && name.length) {
      const transformedVals = [commander];

      if (theme.length) {
        transformedVals.push(`T::${theme}`);
      }

      if (tribe.length) {
        transformedVals.push(`G::${tribe}`);
      }

      if (companion.length) {
        transformedVals.push(`C::${companion}`);
      }

      playerObj[name] = transformedVals.join(" -- ");
    }
  });

  return playerObj;
};
