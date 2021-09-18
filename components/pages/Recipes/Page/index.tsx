import React from 'react'

import Container, { ContainerTitle } from '../../../atoms/Container'

import { RecipeList, RecipeItem, Separator } from './styles'

const Page = () => {
  return (
    <Container>
      <ContainerTitle>Recipes</ContainerTitle>

      <RecipeList>
        {new Array(50).fill(0).map((_, i) => (
          <RecipeItem key={i}>Item {i}</RecipeItem>
        ))}
      </RecipeList>

      <Separator />
    </Container>
  )
}

export default Page
