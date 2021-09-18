import Page from '../../templates/Page'
import RecipeStateProvider from '../../../providers/RecipeStateProvider'
import RecipePage from './Page'

const Secret = () => (
  <Page title='Recipes'>
    <RecipeStateProvider>
      <RecipePage />
    </RecipeStateProvider>
  </Page>
)

export default Secret
