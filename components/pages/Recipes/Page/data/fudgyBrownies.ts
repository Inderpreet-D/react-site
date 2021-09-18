import { Ingredient, Recipe, Page } from '../../types'

const ingredients: Ingredient[] = [
  { amount: '290grams', type: 'Unsalted butter' },
  { amount: '500g', type: 'Sugar' },
  { amount: '160g', type: 'Unsweetened cocoa powder' },
  { amount: '1/2tsp', type: 'Kosher salt' },
  { amount: '2tsp', type: 'Vanilla extract' },
  { amount: '4', type: 'Large eggs' },
  { amount: '130g', type: 'All-purpose flour' }
]

const pages: Page[] = [
  [
    'Before starting, cube the butter to allow it to melt easier.',
    'Setup a double boiler by adding a bit of water to a pot and resting a heat-safe bowl over it.',
    'Make sure the water is just simmering and not touching the bowl.',
    'To this bowl add the butter, sugar, cocoa powder, and salt.',
    'Let this mixture heat and stir occasionally until the butter has melted.'
  ],
  [
    'Take the bowl off the heat and let it cool for a few minutes.',
    'Now is a good time to let the oven preheat to 325°F and line your baking pan with parchment paper.',
    'Make sure the parchment goes over the sides of the pan to make getting the brownies out later easier.'
  ],
  [
    'The bowl should only be warm instead of hot now.',
    'Stir in the vanilla.',
    'Add the eggs one at a time and mix well after each one.',
    'When the batter looks thick and shiny then add the flour.',
    'Keep mixing until the batter pulls away from the sides of the bowl.'
  ],
  [
    'Spread the batter evenly in your pan.',
    'Bake for 20-25 minutes or until a toothpick inserted in the center comes out clean.'
  ]
]

const fudgyBrownies: Recipe = {
  title: 'Fudgy Brownies',
  bake: '325°F for 20-25 minutes',
  makes: '16 brownies, in a 9x13 pan, half the recipe to fit a 8x8',
  ingredients,
  pages
}

export default fudgyBrownies
