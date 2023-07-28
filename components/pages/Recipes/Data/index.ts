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

const toKey = (title: string) => {
  return title
    .split(' ')
    .map(word => word.toLocaleLowerCase())
    .join('-')
}

const asObj: Recipes = recipes.reduce((acc, curr) => {
  const key = toKey(curr.title)
  acc[key] = curr
  return acc
}, {} as Recipes)

export default asObj
