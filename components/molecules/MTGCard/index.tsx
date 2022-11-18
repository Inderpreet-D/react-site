import clsx from 'clsx'
import { FaSync } from '@react-icons/all-files/fa/FaSync'
import { FaPlus } from '@react-icons/all-files/fa/FaPlus'
import { FaMinus } from '@react-icons/all-files/fa/FaMinus'

import { Card } from '../../../shared/toadvillage'

import CardImage from './CardImage'
import Button from '../../atoms/Button'
import Tooltip from '../../atoms/Tooltip'

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
    <Tooltip
      content={
        <div className='flex flex-col'>
          <div className='text-center font-bold'>{card.name}</div>

          {Object.values(card.prices).filter(Boolean).length > 0 && (
            <>
              <div className='text-center underline mb-1 mt-2'>Prices</div>

              {Object.entries(card.prices).map(([locale, cost]) => {
                if (!cost) {
                  return
                }

                let upper = locale.toLocaleUpperCase()
                let extra = ''
                if (upper.includes('_')) {
                  ;[upper, extra] = upper.split('_')
                  if (extra) {
                    extra = ` (${extra.toLocaleLowerCase()})`
                  }
                }

                let numberPrefix = ''
                if (!locale.includes('tix')) {
                  numberPrefix = locale.includes('usd') ? '$' : '€'
                }

                return (
                  <div key={locale} className='flex w-full'>
                    <div className='mr-2'>
                      {upper}
                      {extra}:
                    </div>

                    <div>
                      {numberPrefix}
                      {cost}
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      }
      className='ml-7'
    >
      <div
        data-cy={card.name}
        className='flex flex-col m-1 border-2 border-sky-400 rounded-lg bg-transparent'
      >
        <div className='group relative flex justify-center w-full hover:z-10'>
          <div className='relative w-11/12 h-full'>
            {(!faces || !flipped) && <CardImage src={image} />}

            {faces && flipped && <CardImage src={faces[1].image} />}
          </div>

          <div
            className={clsx(
              'absolute top-1/3 left-1/2 border border-slate-200 rounded-full p-4 bg-slate-800 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 text-5xl font-bold text-sky-400 pointer-events-none group-hover:opacity-0',
              amount === 0 && 'border-red-600 text-red-600'
            )}
          >
            {amount}
          </div>
        </div>

        <div className='flex items-center justify-around mx-auto my-2 w-full'>
          <Button
            onClick={handleSub}
            disabled={amount === 0}
            className='h-10 min-w-[2.5rem] max-w-[4rem] '
          >
            <FaMinus />
          </Button>

          <Button
            onClick={handleMove}
            className='h-10 min-w-[2.5rem] max-w-[4rem] font-bold'
          >
            Move
          </Button>

          <Button
            onClick={handleAdd}
            className='h-10 min-w-[2.5rem] max-w-[4rem] '
          >
            <FaPlus />
          </Button>

          {faces && (
            <Button
              onClick={handleFlip}
              className='h-10 min-w-[2.5rem] max-w-[4rem] '
            >
              <FaSync />
            </Button>
          )}
        </div>
      </div>
    </Tooltip>
  )
}

export default MTGCard
