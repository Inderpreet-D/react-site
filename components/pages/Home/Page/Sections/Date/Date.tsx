import { SectionProps } from '../..'
import { Date } from '../../Data/me'

import {
  StyledContainer,
  StyledHeader,
  StyledPoints,
  StyledPoint,
  StyledArrow
} from './Date.styles'

const Date: React.FunctionComponent<SectionProps> = ({ data, idx }) => {
  const { name, location, title, date, points } = data[idx] as Date

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
  )
}

export default Date
