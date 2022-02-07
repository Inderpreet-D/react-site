import { DivPropsWithoutRef } from 'react-html-props'
import styled from 'styled-components'

const StyledTitle = styled.div`
  margin-bottom: 1.25rem;

  font-size: 2.125rem;
  line-height: 1.235;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.00735em;
`

const ContainerTitle: React.FC<DivPropsWithoutRef> = props => (
  <StyledTitle {...props} data-cy='title' />
)

export default ContainerTitle
