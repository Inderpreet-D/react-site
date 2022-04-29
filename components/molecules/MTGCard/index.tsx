import clsx from 'clsx'
import { FaSync } from '@react-icons/all-files/fa/FaSync'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaMinus } from '@react-icons/all-files/fa/FaMinus'

import { Card } from '../../../shared/toadvillage'

import CardImage from './CardImage'

import { StyledCardActions, StyledButton } from './styles'

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
      <div className='group relative flex justify-center w-full hover:z-10'>
        <div className='relative w-11/12 h-full'>
          {(!faces || !flipped) && <CardImage src={image} />}

          {faces && flipped && <CardImage src={faces[1].image} />}
        </div>

        <div className={clsx(' group-hover:opacity-0', amount === 0 && '')}>
          {amount}
        </div>
      </div>

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
