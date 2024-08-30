import { Recipe, Recipes } from "../types";

// import BrownButterCookies from './brownButterCookies'
import BrownButterCookies from "./brownButterCookies2";
import FudgyBrownies from "./fudgyBrownies";
import SuperBrownies from "./superBrownies";
import PersonalPizzaDough from "./pizzaDough";
import PizzaDough from "./pizzaDough2";
import OvernightOats from "./overnightOats";
import BerrySmoothie from "./berrySmoothie";

const recipes: Recipe[] = [
  BrownButterCookies,
  FudgyBrownies,
  SuperBrownies,
  PersonalPizzaDough,
  PizzaDough,
  OvernightOats,
  BerrySmoothie,
];

const makeSlug = (title: string) => {
  return title
    .split(" ")
    .map((word) => word.toLocaleLowerCase())
    .join("-");
};

const asObj: Recipes = recipes.reduce((acc, curr) => {
  const slug = makeSlug(curr.title);
  acc[slug] = curr;
  return acc;
}, {} as Recipes);

export default asObj;
