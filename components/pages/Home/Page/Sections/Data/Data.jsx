import {
  StyledContainer,
  StyledData,
  StyledKey,
  StyledArrowWrapper,
  StyledArrow,
  StyledValue,
} from "./Data.styles";

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
