import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/Container/Title'
import RecipeBlock from './RecipeBlock'

import { useRecipeState } from '../../../providers/RecipeStateProvider'
import { RecipeList, RecipeItem, Separator } from './styles'

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
