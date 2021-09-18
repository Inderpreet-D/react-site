import React from 'react'

import { PropType as PPT } from '../../types'

import { ListItem } from '../Ingredients/styles'

import { useRecipeState } from '../../../../../providers/RecipeStateProvider'
import { RecipeSection } from '../styles'

type PropType = PPT & {
  index: number
}

const Recipe = ({ recipe: { pages }, index }: PropType) => {
  const {
    state: { checked },
    check
  } = useRecipeState()

  return (
    <RecipeSection>
      {pages[index].map(line => (
        <ListItem
          key={line}
          checked={checked.includes(line)}
          onCheck={() => check(line)}
        >
          {line}
        </ListItem>
      ))}
    </RecipeSection>
  )
}

export default Recipe
