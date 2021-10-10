import { StyledActions } from '../styles'
import Spacer from '../../../atoms/Spacer'

type CardActionProps = {
  alignCenter?: boolean
  alignLeft?: boolean
  alignRight?: boolean
}

const CardActions: React.FC<CardActionProps> = ({
  children,
  alignCenter,
  alignLeft,
  alignRight
}) => (
  <StyledActions>
    {(alignCenter || alignRight) && <Spacer />}
    {children}
    {(alignCenter || alignLeft) && <Spacer />}
  </StyledActions>
)

export default CardActions
