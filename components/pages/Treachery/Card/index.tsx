import { CardResponse } from '../../../../pages/api/treachery/types'

import {
  StyledContainer,
  StyledHeader,
  StyledCard,
  StyledDescription
} from './styles'

const Card: React.FC<CardResponse> = ({ role, imgSrc, winCondition }) => (
  <StyledContainer>
    <StyledHeader>Your Role is {role}</StyledHeader>

    <StyledCard src={imgSrc} />

    <StyledDescription>{winCondition}</StyledDescription>
  </StyledContainer>
)

export default Card
