import { Ingredient, Page, Recipe } from "../types";

const ingredients: Ingredient[] = [
  { amount: "1.5 cups", type: "Frozen mixed berries" },
  { amount: "1/2", type: "Frozen banana" },
  { amount: "1/4 cup", type: "Vanilla greek yogurt" },
  { amount: "3/4 cup", type: "Milk" },
];

const pages: Page[] = [
  [
    "Add all ingredients to a blender.",
    "Blend until smooth.",
    "Add more milk if needed.",
  ],
];

const pizzaDough: Recipe = {
  title: "Berry Smoothie",
  makes: "2 servings",
  ingredients,
  pages,
};

export default pizzaDough;
