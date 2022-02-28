import Page from '../../components/templates/Page'
import GoLPage from '../../components/pages/GoL'

import LifeProvider from '../../providers/LifeProvider'

const GoL = () => (
  <Page title='Game of Life'>
    <LifeProvider>
      <GoLPage />
    </LifeProvider>
  </Page>
)

export default GoL
