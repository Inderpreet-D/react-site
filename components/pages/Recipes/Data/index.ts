import { Recipe, Recipes } from '../types'

// import BrownButterCookies from './brownButterCookies'
import BrownButterCookies from './brownButterCookies2'
import FudgyBrownies from './fudgyBrownies'
import SuperBrownies from './superBrownies'
import PizzaDough from './pizzaDough'

const recipes: Recipe[] = [
  BrownButterCookies,
  FudgyBrownies,
  SuperBrownies,
  PizzaDough
]

const asObj: Recipes = recipes.reduce((prev, curr) => {
  prev[curr.title] = curr
  return prev
}, {} as Recipes)

export default asObj
