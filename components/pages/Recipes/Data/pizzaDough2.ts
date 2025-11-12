import { Ingredient, Page, Recipe } from "../types";

const ingredients: Ingredient[] = [
  { amount: "2 cup", type: "Warm water" },
  { amount: "1tbsp", type: "Yeast" },
  { amount: "1tsp", type: "Salt" },
  { amount: "4tsp", type: "Olive oil" },
  { amount: "5 cups", type: "Flour" },
];

const pages: Page[] = [
  [
    "Dissolve yeast in warm water.",
    "Add salt, olive oil, and flour.",
    "Mix on low speed until dough forms (about 3 minutes at speed 2).",
    "Let dough rest for at least one hour at room temperature.",
  ],
  [
    "Preheat oven to 450°F.",
    "Spread dough and top, bake for 17 minutes and turn halfway through.",
  ],
];

const pizzaDough: Recipe = {
  title: "Pizza Dough",
  bake: "450°F for 17 minutes",
  makes: "1 large pizza",
  ingredients,
  pages,
};

export default pizzaDough;
