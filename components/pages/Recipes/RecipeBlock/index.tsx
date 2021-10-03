import { PropType } from '../types'

import { Box, ButtonHolder, Button, Card } from '../../../atoms/BoxView'
import Ingredients from '../Ingredients'
import Recipe from '../Recipe'

import { useRecipeState } from '../../../../providers/RecipeStateProvider'
import { Section, Control } from './styles'

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
          />
        )}

        <Section>
          <Component recipe={recipe} index={index} />
        </Section>
      </Card>
    </Box>
  )
}

export default RecipeBlock
