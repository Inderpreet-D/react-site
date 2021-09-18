export type Page = string[]

export type Ingredient = {
  amount: string
  type: string
}

export type Recipe = {
  title: string
  ingredients: Ingredient[]
  pages: Page[]
  bake: string
  makes: string
}

export type Recipes = {
  [x: string]: Recipe
}

export type PropType = {
  recipe: Recipe
  index: number
}
