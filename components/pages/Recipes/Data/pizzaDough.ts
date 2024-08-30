import { Ingredient, Page, Recipe } from '../types'

const ingredients: Ingredient[] = [
  { amount: '1 cup', type: 'Warm water' },
  { amount: '1.5tsp', type: 'Yeast' },
  { amount: '2tsp', type: 'Sugar' },
  { amount: '1.25tsp', type: 'Salt' },
  { amount: '2.5 cups', type: 'White flour' }
]

const pages: Page[] = [
  [
    'Combine water and yeast in glass and let sit for 5 minutes.',
    'If yeast is alive then add to bowl containing sugar, salt, and flour.',
    'Knead until the dough can be stretched translucent without ripping (10 minutes).',
    'Split dough into two parts and let rest for at least 30 minutes at room temperature or up to 6 days in the refrigerator.'
  ],
  [
    'Get oven to max temperature and let pizza stone/steel preheat for at least an hour.',
    'Spread dough and top, bake for 8 minutes and turn halfway through.'
  ]
]

const pizzaDough: Recipe = {
  title: 'Personal Pizza Dough',
  bake: 'Max temp (500°F) for 8 minutes',
  makes: '2 personal size pizzas',
  ingredients,
  pages
}

export default pizzaDough
