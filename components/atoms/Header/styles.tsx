import styled from 'styled-components'

import breakpoints from '../../../utilities/breakpoints'

const StyledHeader = styled.div`
  display: flex;

  border-bottom: 0.0625rem solid ${({ theme }) => theme.accent};
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.backgroundLight};
`

const StyledDesktopItems = styled.div`
  display: none;

  overflow: auto;

  @media ${breakpoints.laptop}, ${breakpoints.desktop} {
    display: flex;
  }
`

const StyledMobileItems = styled.div`
  display: none;

  @media ${breakpoints.base}, ${breakpoints.mobile}, ${breakpoints.tablet} {
    display: flex;
  }
`

export { StyledHeader, StyledDesktopItems, StyledMobileItems }
