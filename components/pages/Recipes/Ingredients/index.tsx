import { PropType } from '../types'

import ContainerSection from '../../../atoms/ContainerSection'
import ListItem from '../../../atoms/ListItem'

import { useRecipeState } from '../../../../providers/RecipeStateProvider'

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
            className='mb-4'
          >
            {ing.amount} - {ing.type}
          </ListItem>
        )
      })}

      <div className='mb-4 font-bold'>Bake at: {bake}</div>

      <div className='mb-4 font-bold'>Makes: {makes}</div>
    </ContainerSection>
  )
}

export default Ingredients
