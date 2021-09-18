import React from 'react'

import Container, { ContainerTitle } from '../../../atoms/Container'
import RecipeBlock from './RecipeBlock'

import { RecipeList, RecipeItem, Separator } from './styles'

import recipes from './data'

const Page = () => {
  const [selected, setSelected] = React.useState('')
  const [hovering, setHovering] = React.useState('')

  const toggleSelect = React.useCallback(
    (name: string) => () => {
      setSelected(old => {
        if (old === name) {
          return ''
        }
        return name
      })
    },
    []
  )

  return (
    <Container>
      <ContainerTitle>Recipes</ContainerTitle>

      <RecipeList>
        {Object.keys(recipes).map(name => (
          <RecipeItem
            key={name}
            active={[selected, hovering].includes(name)}
            onClick={toggleSelect(name)}
            onMouseEnter={() => setHovering(name)}
            onMouseLeave={() => setHovering('')}
          >
            {name}
          </RecipeItem>
        ))}
      </RecipeList>

      <Separator />

      {selected && <RecipeBlock recipe={recipes[selected]} />}
    </Container>
  )
}

export default Page
