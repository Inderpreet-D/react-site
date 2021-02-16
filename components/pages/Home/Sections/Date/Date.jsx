import styled from "styled-components";
import { GiFrayedArrow } from "react-icons/gi";

const StyledArrow = styled(GiFrayedArrow)`
  align-items: center;
  justify-content: center;

  display: flex;
  transform: rotate(-45deg);

  margin-right: 0.75rem;
`;

const StyledPoint = styled.div`
  display: flex;

  margin-bottom: 0.75rem;
`;

const StyledPoints = styled.div`
  flex-direction: column;

  display: flex;

  padding: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;

  & > span:first-child {
    flex-grow: 1;

    margin-bottom: 0.5rem;

    font-weight: bold;
  }

  & > span:last-child {
    font-style: italic;
  }
`;

const StyledContainer = styled.div`
  flex-direction: column;

  display: flex;

  padding: 1rem;
`;

const Date = ({ data, idx }) => {
  const { name, location, title, date, points } = data[idx];

  return (
    <StyledContainer>
      <StyledHeader>
        <span>{name}</span>
        <span>{location}</span>
      </StyledHeader>

      <StyledHeader>
        <span>{title}</span>
        <span>{date}</span>
      </StyledHeader>

      <StyledPoints>
        {points.map((point, i) => (
          <StyledPoint key={i}>
            <StyledArrow />
            {point}
          </StyledPoint>
        ))}
      </StyledPoints>
    </StyledContainer>
  );
};

export default Date;
