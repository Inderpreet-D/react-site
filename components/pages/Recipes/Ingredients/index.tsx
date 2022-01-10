import { PropType } from '../types'

import ContainerSection from '../../../atoms/ContainerSection'

import { useRecipeState } from '../../../../providers/RecipeStateProvider'
import { ListItem, NormalListItem } from './styles'

const Ingredients = ({ recipe: { bake, ingredients, makes } }: PropType) => {
  const {
    state: { checked },
    check
  } = useRecipeState()

  return (
    <ContainerSection>
      {ingredients.map(ing => {
        const key = `${ing.amount}-${ing.type}`

        return (
          <ListItem
            key={key}
            checked={checked.includes(key)}
            onCheck={() => check(key)}
          >
            {ing.amount} - {ing.type}
          </ListItem>
        )
      })}

      <NormalListItem>Bake at: {bake}</NormalListItem>

      <NormalListItem>Makes: {makes}</NormalListItem>
    </ContainerSection>
  )
}

export default Ingredients
