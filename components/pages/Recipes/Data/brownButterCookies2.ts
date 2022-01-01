import { Ingredient, Recipe, Page } from '../types'

const ingredients: Ingredient[] = [
  { amount: '284g', type: 'Salted butter, browned' },
  { amount: '151g', type: 'Sugar' },
  { amount: '220g', type: 'Brown sugar' },
  { amount: '2', type: 'Large eggs' },
  { amount: '1tsp', type: 'Vanilla extract' },
  { amount: '374g', type: 'All-purpose flour' },
  { amount: '2tsp', type: 'Baking soda' },
  { amount: '1/2tsp', type: 'Salt' },
  { amount: '425g', type: 'Chocolate chips' }
]

const pages: Page[] = [
  [
    'Start by browning the butter.',
    'When browned, put this butter into a mixing bowl and refrigerate until solid.'
  ],
  [
    'Cream the butter, sugars, eggs, and vanilla.',
    'Let mix for 2-3 minutes until the mixture is pale and fluffy.',
    'Add flour, baking soda, and salt.',
    'Mix until just combined.',
    'Stir in chocolate chips.'
  ],
  [
    'Portion dough across 2 baking sheets.',
    'Let these trays cool in the fridge for an hour.'
  ],
  [
    'Preheat your oven to 375°F.',
    'Bake the cookies until golden brown around the edges.',
    'This should take 8-10 minutes.',
    'Check on them about half way through and make sure they are baking evenly, if not just rotate them.',
    'After baking let the cookies cool in the baking sheet for 2-3 minutes before moving to a cooling rack.'
  ]
]

const brownButterCookies: Recipe = {
  title: 'Brown Butter Cookies',
  bake: '375°F for 8-10 minutes',
  makes: '16 cookies',
  ingredients,
  pages
}

export default brownButterCookies
