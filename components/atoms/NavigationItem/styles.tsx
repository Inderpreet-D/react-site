import styled from 'styled-components'

import breakpoints from '../../../utilities/breakpoints'

const StyledHolder = styled.div`
  width: 100%;
  height: 3.125rem;

  cursor: pointer;

  user-select: none;
`

const StyledLink = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  transition: all 750ms;

  border: 0.25rem solid transparent;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 0.25rem;

  text-align: center;

  &:hover,
  &:hover,
  &.active {
    color: ${({ theme }) => theme.foreground};
  }

  @media ${breakpoints.laptop}, ${breakpoints.desktop} {
    &:hover,
    &:active,
    &.active {
      border-bottom: 0.25rem solid ${({ theme }) => theme.foregroundDark};

      background-color: ${({ theme }) => theme.background};
    }

    &:hover {
      padding-bottom: 0.75rem;
      transition: all 250ms;
    }
  }

  @media ${breakpoints.mobile}, ${breakpoints.tablet} {
    &:hover,
    &:active,
    &.active {
      border-right: 0.25rem solid ${({ theme }) => theme.foregroundDark};
      border-left: 0.25rem solid ${({ theme }) => theme.foregroundDark};

      background-color: ${({ theme }) => theme.backgroundLight};
    }
  }
`

export { StyledHolder, StyledLink }
