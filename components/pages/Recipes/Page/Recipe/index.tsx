import React from 'react'

import { PropType as PPT } from '../../types'
import { ListItem } from '../Ingredients/styles'
import { RecipeSection } from '../styles'

type PropType = PPT & {
  index: number
}
        
const Recipe = ({ recipe: { pages }, index }: PropType) => {
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
      {pages[index].map(line => (
        <ListItem
          key={line}
          checked={checked.includes(line)}
          onCheck={toggleCheck(line)}
        >
          {line}
        </ListItem>
      ))}
    </RecipeSection>
  )
}

export default Recipe
