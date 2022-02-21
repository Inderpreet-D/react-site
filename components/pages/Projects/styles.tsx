import styled from 'styled-components'

import breakpoints from '../../../utilities/breakpoints'

const StyledGrid = styled.div`
  align-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  display: grid;

  padding: 2rem;

  @media ${breakpoints.tablet} {
    grid-template-columns: auto auto;
  }

  @media ${breakpoints.base}, ${breakpoints.mobile} {
    grid-template-columns: auto;
  }
`

export default StyledGrid
