import { FaSync } from '@react-icons/all-files/fa/FaSync'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaMinus } from '@react-icons/all-files/fa/FaMinus'

import { Card } from '../../../shared/toadvillage'

import {
  StyledCard,
  StyledImageHolder,
  StyledCardImageHolder,
  StyledCardImage,
  StyledCardCount,
  StyledCardActions,
  StyledButton
} from './styles'

type MTGCardProps = {
  amount: number
  isCommander: boolean
  card: Card
  onClickMove: (name: string, isCommander: boolean) => void
  onClickAdd: (name: string, isCommander: boolean) => void
  onClickRemove: (name: string, isCommander: boolean) => void
}

const MTGCard: React.FC<MTGCardProps> = ({
  amount,
  isCommander,
  card,
  onClickMove,
  onClickAdd,
  onClickRemove
}) => {
  const [flipped, setFlipped] = React.useState(false)

  const { image, name, faces } = card

  const handleSub = () => amount > 0 && onClickRemove(name, isCommander)
  const handleMove = () => onClickMove(name, isCommander)
  const handleAdd = () => onClickAdd(name, isCommander)
  const handleFlip = () => setFlipped(!flipped)

  return (
    <StyledCard>
      <StyledImageHolder>
        <StyledCardImageHolder>
          {(!faces || !flipped) && <StyledCardImage src={image} />}

          {faces && flipped && <StyledCardImage src={faces[1].image} />}
        </StyledCardImageHolder>

        <StyledCardCount noCards={amount === 0}>{amount}</StyledCardCount>
      </StyledImageHolder>

      <StyledCardActions>
        <StyledButton onClick={handleSub} isGrey={amount === 0}>
          <FaMinus />
        </StyledButton>

        <StyledButton onClick={handleMove} style={{ fontWeight: 'bold' }}>
          Move
        </StyledButton>

        <StyledButton onClick={handleAdd}>
          <FaPlus />
        </StyledButton>

        {faces && (
          <StyledButton onClick={handleFlip}>
            <FaSync />
          </StyledButton>
        )}
      </StyledCardActions>
    </StyledCard>
  )
}

export default MTGCard
