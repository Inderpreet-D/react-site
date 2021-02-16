import styled from "styled-components";
import { GiStitchedWound } from "react-icons/gi";

import breakpoints from "../../../../../breakpoints";

const StyledValue = styled.div`
  font-style: italic;
`;

const StyledArrow = styled(GiStitchedWound)`
  transform: rotate(45deg);
`;

const StyledArrowWrapper = styled.div`
  flex-grow: 1;

  display: flex;

  margin-right: 0.5rem;
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

const Data = ({ data }) => (
  <StyledContainer>
    {data.map(({ key, value }, i) => (
      <StyledData key={i}>
        <StyledKey>{key}</StyledKey>

        <StyledArrowWrapper>
          <StyledArrow />
        </StyledArrowWrapper>

        <StyledValue>
          {value} year{value === 1 ? "" : "s"}
        </StyledValue>
      </StyledData>
    ))}
  </StyledContainer>
);

export default Data;
