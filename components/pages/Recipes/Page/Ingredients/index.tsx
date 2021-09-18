import React from 'react'

import { RecipeSection } from '../styles'
import { ListItem, NormalListItem } from './styles'

import { PropType } from '../../types'

const Ingredients = ({ recipe: { bake, ingredients, makes } }: PropType) => {
  const [checked, setChecked] = React.useState<string[]>([])

  const toggleCheck = React.useCallback(
    (val: string) => () => {
      setChecked(old => {
        if (old.includes(val)) {
          return old.filter(oldVal => oldVal !== val)
        }

        return [...new Set([...old, val])]
      })
    },
    []
  )

  return (
    <RecipeSection>
      {ingredients.map(ing => {
        const key = `${ing.amount}-${ing.type}`
        return (
          <ListItem
            key={key}
            checked={checked.includes(key)}
            onCheck={toggleCheck(key)}
          >
            {ing.amount} - {ing.type}
          </ListItem>
        )
      })}

      <NormalListItem>Bake at: {bake}</NormalListItem>

      <NormalListItem>Makes: {makes}</NormalListItem>
    </RecipeSection>
  )
}

export default Ingredients
