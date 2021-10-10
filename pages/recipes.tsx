import RecipeStateProvider from '../providers/RecipeStateProvider'

import Page from '../components/templates/Page'
import RecipePage from '../components/pages/Recipes'

const Secret = () => (
  <Page title='Recipes'>
    <RecipeStateProvider>
      <RecipePage />
    </RecipeStateProvider>
  </Page>
)

export default Secret
