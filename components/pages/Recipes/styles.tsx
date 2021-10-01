import styled from 'styled-components'

import { Button, Separator as Sep } from '../../atoms/BoxView'

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
  min-width: 12rem;
  width: 100%;
  max-width: 12rem;
  text-align: center;
`

export const Separator = styled(Sep)`
  margin-top: 0.5rem;
`

export const RecipeSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 1rem;

  & > :last-child {
    margin-bottom: 0;
  }
`
