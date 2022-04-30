import { PropType as PPT } from '../types'

import ContainerSection from '../../../atoms/ContainerSection'
import ListItem from '../../../atoms/ListItem'

import { useRecipeState } from '../../../../providers/RecipeStateProvider'

type PropType = PPT & {
  index: number
}

const Recipe = ({ recipe: { pages }, index }: PropType) => {
  const {
    state: { checked },
    check
  } = useRecipeState()

  return (
    <ContainerSection>
      {pages[index].map(line => (
        <ListItem
          key={line}
          checked={checked.includes(line)}
          onCheck={() => check(line)}
          className='mb-4'
        >
          {line}
        </ListItem>
      ))}
    </ContainerSection>
  )
}

export default Recipe
