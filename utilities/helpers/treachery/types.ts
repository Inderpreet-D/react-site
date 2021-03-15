import { Rarity, RoleName } from "../../../shared/treachery";

type Cards = {
  [x in Rarity]: string[];
};

export type Roles = {
  [x in RoleName]: Cards;
};

export type WinConditions = {
  [x in RoleName]: string;
};
