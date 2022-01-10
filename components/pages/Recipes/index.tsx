import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import RecipeBlock from './RecipeBlock'
import HorizontalList from '../../atoms/HorizontalList'
import HorizontalListButton from '../../atoms/HorizontalListButton'
import ContainerSectionSeparator from '../../atoms/ContainerSectionSeparator'

import { useRecipeState } from '../../../providers/RecipeStateProvider'

import recipes from './Data'

const Page = () => {
  const [selected, setSelected] = React.useState('')
  const [hovering, setHovering] = React.useState('')
  const { reset } = useRecipeState()

  const toggleSelect = React.useCallback(
    (name: string) => () => {
      setSelected(old => {
        if (old === name) {
          return ''
        }

        reset()
        return name
      })
    },
    [reset]
  )

  return (
    <Container>
      <ContainerTitle>Recipes</ContainerTitle>

      <HorizontalList>
        {Object.keys(recipes).map(name => (
          <HorizontalListButton
            key={name}
            active={[selected, hovering].includes(name)}
            onClick={toggleSelect(name)}
            onMouseEnter={() => setHovering(name)}
            onMouseLeave={() => setHovering('')}
          >
            {name}
          </HorizontalListButton>
        ))}
      </HorizontalList>

      <ContainerSectionSeparator />

      {selected && <RecipeBlock recipe={recipes[selected]} />}
    </Container>
  )
}

export default Page
