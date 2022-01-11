import styled from 'styled-components'

import Btn from '../Button'

import breakpoints from '../../../utilities/breakpoints'

export const Button = styled(Btn)`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${breakpoints.base}, ${breakpoints.mobile}, ${breakpoints.tablet} {
    top: -0.0625rem;
    left: -0.0625rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top: none;
    border-left: none;
    background-color: transparent;
  }
`
