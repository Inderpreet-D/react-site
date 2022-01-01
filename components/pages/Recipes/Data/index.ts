import { Recipe, Recipes } from '../types'

// import BrownButterCookies from './brownButterCookies'
import BrownButterCookies from './brownButterCookies2'
import FudgyBrownies from './fudgyBrownies'
import SuperBrownies from './superBrownies'

const recipes: Recipe[] = [BrownButterCookies, FudgyBrownies, SuperBrownies]

const asObj: Recipes = recipes.reduce((prev, curr) => {
  prev[curr.title] = curr
  return prev
}, {} as Recipes)

export default asObj
