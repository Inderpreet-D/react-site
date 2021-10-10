import ToadVillageStateProvider from '../providers/ToadVillageStateProvider'

import Page from '../components/templates/Page'
import ToadVillagePage from '../components/pages/ToadVillage'

const ToadVillage = () => (
  <Page title='Toad Village'>
    <ToadVillageStateProvider>
      <ToadVillagePage />
    </ToadVillageStateProvider>
  </Page>
)

export default ToadVillage
