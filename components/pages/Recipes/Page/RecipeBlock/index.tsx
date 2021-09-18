import React from 'react'

import { PropType } from '../../types'

import { Box, ButtonHolder, Button, Card } from '../../../../atoms/BoxView'
import { Section, Control } from './styles'
import Ingredients from '../Ingredients'
import Recipe from '../Recipe'

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
  const [index, setIndex] = React.useState(0)

  const Component = components[selected]

  React.useEffect(() => {
    console.log({ recipe })
  }, [recipe])

  return (
    <Box>
      <ButtonHolder>
        {Object.keys(MAP).map((name: ButtonType) => (
          <Button
            key={name}
            active={[selected, hovering].includes(name)}
            onClick={() => setSelected(name)}
            onMouseEnter={() => setHovering(name)}
            onMouseLeave={() => setHovering('')}
          >
            {MAP[name]}
          </Button>
        ))}
      </ButtonHolder>

      <Card>
        {selected === 'recipe' && (
          <Control
            current={index}
            last={recipe.pages.length}
            onForward={() => setIndex(old => old + 1)}
            onBack={() => setIndex(old => old - 1)}
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
