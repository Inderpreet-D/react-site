import { Ingredient, Page, Recipe } from "../types";

const ingredients: Ingredient[] = [
  { amount: "1/2 cup", type: "Rolled oats" },
  { amount: "1tbsp", type: "Chia seeds" },
  { amount: "1/4tsp", type: "Cinnamon" },
  { amount: "Pinch", type: "Salt" },
  { amount: "3tbsp", type: "Vanilla greek yogurt" },
  { amount: "1/2 cup", type: "Milk" },
  { amount: "1/2tbsp", type: "Peanut butter" },
  { amount: "1tbsp", type: "Chocolate chips" },
];

const pages: Page[] = [
  [
    "Combine oats, chia seeds, cinnamon, and salt in a bowl or mason jar.",
    "Mix the dry ingredients thoroughly.",
    "Add yogurt, milk, and peanut butter.",
    "Mix until combined.",
    "Top with chocolate chips.",
    "Pour into a mason jar.",
    "Refrigerate overnight.",
  ],
];

const pizzaDough: Recipe = {
  title: "Overnight Oats",
  makes: "1 serving",
  ingredients,
  pages,
};

export default pizzaDough;
