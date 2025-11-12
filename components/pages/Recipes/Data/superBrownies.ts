import { Ingredient, Recipe, Page } from "../types";

const ingredients: Ingredient[] = [
  { amount: "226g", type: "Unsalted butter, cubed" },
  { amount: "227g", type: "Bitter-sweet chocolate" },
  { amount: "1/2tsp", type: "Salt" },
  { amount: "200g", type: "Sugar" },
  { amount: "230g", type: "Brown sugar" },
  { amount: "2tsp", type: "Vanilla extract" },
  { amount: "4", type: "Large Eggs" },
  { amount: "130g", type: "All-purpose flour" },
];

const pages: Page[] = [
  [
    "Setup a double boiler by adding a bit of water to a pot and resting a heat-safe bowl over it.",
    "Make sure the water is just simmering and not touching the bowl.",
    "To this bowl add the butter and chocolate.",
    "Let this mixture heat and stir occasionally until the butter and chocolate have melted.",
  ],
  [
    "Take the bowl off the heat and let it cool for a few minutes.",
    "Now is a good time to let the oven preheat to 350°F and line your baking pan with parchment paper.",
    "Make sure the parchment goes over the sides of the pan to make getting the brownies out later easier.",
  ],
  [
    "The bowl should only be warm instead of hot now.",
    "Stir in the salt, sugars, and vanilla.",
    "Add the eggs one at a time and mix well after each one.",
    "When the batter looks thick and shiny then add the flour.",
    "Keep mixing until the batter pulls away from the sides of the bowl.",
  ],
  [
    "Spread the batter evenly in your pan.",
    "Bake for 45 minutes or until a toothpick inserted in the center comes out clean.",
  ],
];

const superBrownies: Recipe = {
  title: "Super Brownies",
  bake: "350°F for 45 minutes",
  makes: "16 brownies in a 9x13 pan",
  ingredients,
  pages,
};

export default superBrownies;
