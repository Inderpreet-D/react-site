import { PropType } from '../types'

import Ingredients from '../Ingredients'
import Recipe from '../Recipe'
import Box from '../../../atoms/Box'
import ButtonHolder from '../../../atoms/ButtonHolder'
import Button from '../../../atoms/Button'
import Card from '../../../atoms/Card'
import Control from '../../../atoms/Control'
import Section from '../../../atoms/Section'

import { useRecipeState } from '../../../../providers/RecipeStateProvider'

type ButtonType = 'ingredients' | 'recipe'
type HoverType = ButtonType | ''
const MAP = {
  ingredients: 'Ingredients',
  recipe: 'Recipe'
}
const components = {
  ingredients: Ingredients,
  recipe: Recipe
}

const RecipeBlock = ({ recipe }: PropType) => {
  const [selected, setSelected] = React.useState<ButtonType>('ingredients')
  const [hovering, setHovering] = React.useState<HoverType>('')
  const {
    state: { index },
    update
  } = useRecipeState()

  const Component = components[selected]

  return (
    <Box>
      <ButtonHolder>
        {Object.keys(MAP).map(name => {
          const nameType = name as ButtonType

          return (
            <Button
              key={name}
              active={[selected, hovering].includes(nameType)}
              onClick={() => setSelected(nameType)}
              onMouseEnter={() => setHovering(nameType)}
              onMouseLeave={() => setHovering('')}
              className='w-full mb-2 lg:mb-0'
            >
              {MAP[nameType]}
            </Button>
          )
        })}
      </ButtonHolder>

      <Card>
        {selected === 'recipe' && (
          <Control
            current={index}
            last={recipe.pages.length}
            onForward={() => update(index + 1)}
            onBack={() => update(index - 1)}
            className='mb-6'
          />
        )}

        <Section className='flex-1'>
          <Component recipe={recipe} index={index} />
        </Section>
      </Card>
    </Box>
  )
}

export default RecipeBlock
