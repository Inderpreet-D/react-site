import clsx from 'clsx'
import { FaSync } from '@react-icons/all-files/fa/FaSync'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaMinus } from '@react-icons/all-files/fa/FaMinus'

import { Card } from '../../../shared/toadvillage'

import {
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

  const handleSub = React.useCallback(() => {
    if (amount > 0) {
      onClickRemove(name, isCommander)
    }
  }, [amount, onClickRemove, name, isCommander])
  const handleMove = React.useCallback(() => {
    onClickMove(name, isCommander)
  }, [onClickMove, name, isCommander])
  const handleAdd = React.useCallback(() => {
    onClickAdd(name, isCommander)
  }, [onClickAdd, name, isCommander])
  const handleFlip = React.useCallback(() => {
    setFlipped(old => !old)
  }, [])

  return (
    <div className='flex flex-col m-1 border-2 border-sky-400 rounded-lg bg-transparent'>
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
    </div>
  )
}

export default MTGCard
