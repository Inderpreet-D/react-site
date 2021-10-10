import { Recipe, Recipes } from '../types'

import BrownButterCookies from './brownButterCookies'
import FudgyBrownies from './fudgyBrownies'

const recipes: Recipe[] = [BrownButterCookies, FudgyBrownies]

const asObj: Recipes = recipes.reduce((prev, curr) => {
  prev[curr.title] = curr
  return prev
}, {} as Recipes)

export default asObj
