import { Ingredient, Recipe, Page } from '../../types'

const ingredients: Ingredient[] = [
  { amount: '113g', type: 'Butter, browned' },
  { amount: '56g', type: 'Butter, cubed' },
  { amount: '200g', type: 'Brown sugar' },
  { amount: '50g', type: 'Sugar' },
  { amount: '2', type: 'Large eggs' },
  { amount: '2tsp', type: 'Vanilla extract' },
  { amount: '200g', type: 'All-purpose flour' },
  { amount: '4g', type: 'Kosher salt' },
  { amount: '4g', type: 'Baking soda' },
  { amount: '170g', type: 'Chocolate chips' }
]

const pages: Page[] = [
  [
    'Start by browning 113g of butter.',
    'It helps if the butter is all cubed and roughly the same size.',
    'Remember to stir often and keep a close eye on it to prevent burning.',
    'This should take about 4-8 minutes.'
  ],
  [
    'After browning the butter transfer it to a heat-safe bowl and let cool for a minute.',
    'Once cooled add in the remaining butter cubes one at a time.',
    'These cubes should melt but not sizzle.'
  ],
  [
    'After all the butter is melted, add the sugars to that bowl.',
    'Whisk sugar and butter mixture until combined and not lumpy.'
  ],
  [
    'Add eggs to the mix and whisk until everything is smooth.',
    'At this point the batter should be a thick liquid.',
    'Add the vanilla and whisk.'
  ],
  [
    'Combine flour, salt, and baking soda in a separate bowl.',
    'Add this mix to the wet ingredients and fold it in.',
    "Keep folding until no dry spots remain but don't overdo it."
  ],
  [
    'Fold in the chocolate now.',
    'You can substitue the chocolate for whatever else but I try to keep the ratio of sugar the same.',
    'For reference, chocolate chips are about 1/2 sugar so they add about 85g of sugar.',
    'Balancing the sugar prevents the cookies from being too sweet.'
  ],
  [
    'At this point the dough might be a bit runny so refrigerate the bowl to let it thicken.',
    'About 15 minutes should be fine.'
  ],
  ['While the dough is chilling pre-heat the oven to 375°F.'],
  [
    'After the dough has cooled separate it into 16 cookies across two baking sheets.',
    'It might help to use an ice cream scoop to get consistent cookie sizes.',
    'I also recommend some silicone baking mats for easier cleanup.'
  ],
  [
    'Bake the cookies until golden brown around the edges.',
    'This should take 8-10 minutes.',
    'Check on them about half way through and make sure they are baking evenly, if not just rotate them.'
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
