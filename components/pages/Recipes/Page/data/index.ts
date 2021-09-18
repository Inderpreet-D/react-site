import { Recipe, Recipes } from '../../types'

import BrownButterCookies from './brownButterCookies'

const recipes: Recipe[] = [BrownButterCookies]

const asObj: Recipes = recipes.reduce((prev, curr) => {
  prev[curr.title] = curr
  return prev
}, {} as Recipes)

export default asObj
