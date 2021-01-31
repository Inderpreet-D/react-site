import styled from "styled-components";

import breakpoints from "../../../breakpoints";

export default styled.div`
  width: 55%;
  margin: 1rem auto;
  padding: 1.25rem;
  border: ${({ theme }) => `0.125rem solid ${theme.foregroundDark}`};
  border-radius: 1rem;
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
`;
