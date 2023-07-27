import { useRouter } from 'next/router'

import { useAppDispatch } from '../../../hooks/redux'

import Container from '../../atoms/Container'
import ContainerTitle from '../../atoms/ContainerTitle'
import RecipeBlock from './RecipeBlock'
import HorizontalList from '../../atoms/HorizontalList'
import HorizontalListButton from '../../atoms/HorizontalListButton'
import ContainerSectionSeparator from '../../atoms/ContainerSectionSeparator'

import { reset } from '../../../slices/recipe'

import recipes from './Data'

const Page = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const [selected, setSelected] = React.useState('')
  const [hovering, setHovering] = React.useState('')

  const toggleSelect = React.useCallback(
    (name: string) => {
      setSelected(old => {
        if (old === name) {
          return ''
        }

        dispatch(reset())
        return name
      })
    },
    [dispatch]
  )

  // Select based on url
  React.useEffect(() => {
    if (router.query.id) {
      toggleSelect(router.query.id as string)
    }
  }, [toggleSelect, router.query])

  return (
    <Container>
      <ContainerTitle>Recipes</ContainerTitle>

      <HorizontalList>
        {Object.keys(recipes).map(name => (
          <HorizontalListButton
            key={name}
            active={[selected, hovering].includes(name)}
            onClick={() => router.push(`/recipes/${name}`)}
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
