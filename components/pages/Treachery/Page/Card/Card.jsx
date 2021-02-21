import {
  StyledContainer,
  StyledHeader,
  StyledCard,
  StyledDescription,
} from "./Card.styles";

const Card = ({ cardState: { role, imgSrc, winCondition } }) => (
  <StyledContainer>
    <StyledHeader>Your Role is {role}</StyledHeader>

    <StyledCard src={imgSrc} />

    <StyledDescription>{winCondition}</StyledDescription>
  </StyledContainer>
);

export default Card;
