import { SectionProps } from '../..'
import { KV } from '../../Data/me'

import {
  StyledContainer,
  StyledData,
  StyledKey,
  StyledArrowWrapper,
  StyledArrow,
  StyledValue
} from './Data.styles'

const Data: React.FC<SectionProps> = ({ data }) => (
  <StyledContainer>
    {(data as KV[]).map(({ key, value }, i) => (
      <StyledData key={i}>
        <StyledKey>{key}</StyledKey>

        <StyledArrowWrapper>
          <StyledArrow />
        </StyledArrowWrapper>

        <StyledValue>
          {value} year{value === 1 ? '' : 's'}
        </StyledValue>
      </StyledData>
    ))}
  </StyledContainer>
)

export default Data
