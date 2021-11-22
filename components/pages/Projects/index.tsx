import StyledGrid from './styles'
import Card from '../../molecules/Card'

import Projects from './Data'

const Page = () => (
  <StyledGrid>
    {Projects.map((data, i) => (
      <Card key={i} {...data} />
    ))}
  </StyledGrid>
)

export default Page
