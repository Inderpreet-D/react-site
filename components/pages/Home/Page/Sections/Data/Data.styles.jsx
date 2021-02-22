import styled from "styled-components";
import { GiStitchedWound } from "react-icons/gi";

import breakpoints from "../../../../../../utilities/breakpoints";

const StyledValue = styled.div`
  font-style: italic;
`;

const StyledArrow = styled(GiStitchedWound)`
  transform: rotate(45deg);
`;

const StyledArrowWrapper = styled.div`
  flex-grow: 1;

  display: flex;

  margin: 0 0.5rem 0 0.25rem;
  border-right: 0.0625rem solid ${({ theme }) => theme.foregroundDark};
`;

const StyledKey = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.foregroundDark};
`;

const StyledData = styled.div`
  align-items: center;
  justify-content: center;

  display: flex;

  margin: 0.5rem;
  padding-right: 3rem;
`;

const StyledContainer = styled.div`
  grid-template-columns: auto auto;

  display: grid;

  padding: 1rem;

  @media ${breakpoints.tablet} {
    grid-template-columns: auto;
  }

  @media ${breakpoints.mobile} {
    flex-direction: column;

    display: flex;
  }
`;

export {
  StyledContainer,
  StyledData,
  StyledKey,
  StyledArrowWrapper,
  StyledArrow,
  StyledValue,
};
