import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'

import { PropType } from '../types'

import ContainerSection from '../../../atoms/ContainerSection'
import ListItem from '../../../atoms/ListItem'

import { selectRecipe, toggleCheck } from '../../../../slices/recipe'

const Ingredients = ({ recipe: { bake, ingredients, makes } }: PropType) => {
  const dispatch = useAppDispatch()
  const { checked } = useAppSelector(selectRecipe)

  return (
    <ContainerSection>
      {ingredients.map(ing => {
        const key = `${ing.amount}-${ing.type}`

        return (
          <ListItem
            key={key}
            checked={checked.includes(key)}
            onCheck={() => dispatch(toggleCheck(key))}
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
