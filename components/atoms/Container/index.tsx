import styled from 'styled-components'

import breakpoints from '../../../utilities/breakpoints'

export default styled.div`
  margin: 1rem auto;
  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 1rem;
  box-sizing: border-box;
  width: 55%;
  padding: 1.25rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  @media ${breakpoints.mobile} {
    width: 80%;
  }
  @media ${breakpoints.tablet} {
    width: calc(55% + (2 * calc(25% / 3)));
  }
  @media ${breakpoints.laptop} {
    width: calc(55% + calc(25% / 3));
  }
`
