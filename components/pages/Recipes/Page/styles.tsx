import styled from 'styled-components'

import { Button, Separator as Sep } from '../../../atoms/BoxView'

export const RecipeList = styled.div`
  display: flex;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 0.5rem;

  ${Button}:not(:last-child) {
    margin-right: 1rem;
  }
`

export const RecipeItem = styled(Button)`
  min-width: 7rem;
  text-align: center;
`

export const Separator = styled(Sep)`
  margin-top: 0.5rem;
`
