import clsx from 'clsx'

import { reverseCostSort } from '../../../../utilities/helpers/toadvillage'
import { titleClassName, useCardState } from '../providers/CardStateProvider'

const ComboSection: React.FC = () => {
  const { combinedCards } = useCardState()

  const topCards = React.useMemo(() => {
    const copy = [...combinedCards]

    const sorted = copy.sort(reverseCostSort)

    return sorted.slice(0, 5).map(card => ({
      name: card.card.name,
      url: encodeURIComponent(`card:'${card.card.name}'`)
    }))
  }, [combinedCards])

  return (
    <div className={clsx(titleClassName, 'flex-col !items-start')}>
      <div className='mb-4'>Possible Combos</div>

      {topCards.map((data, i) => (
        <a
          key={data.name}
          href={`https://commanderspellbook.com/search/?q=${data.url}`}
          target='_blank'
          rel='noreferrer noopener'
          className='ml-8 mb-4 list-decimal decoration-primary-light last:mb-0'
        >
          {i + 1} - {data.name}
        </a>
      ))}
    </div>
  )
}

export default ComboSection
