import WordleStateProvider from '../providers/WordleStateProvider'

import Page from '../components/templates/Page'
import WordlePage from '../components/pages/Wordle'

const Wordle = () => (
  <Page title='Wordle'>
    <WordleStateProvider>
      <WordlePage />
    </WordleStateProvider>
  </Page>
)

export default Wordle
