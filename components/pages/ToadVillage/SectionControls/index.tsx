import { FormattedCard } from '../../../../shared/toadvillage'

import Select from '../../../atoms/Select'

import {
  nameSort,
  reverseNameSort,
  costSort,
  reverseCostSort
} from '../../../../utilities/helpers/toadvillage'
import { titleClassName, useCardState } from '../providers/CardStateProvider'
import useSWR from '../../../../hooks/useSWR'

const sortMap: {
  [x: string]: (a: FormattedCard, b: FormattedCard) => number
} = {
  'Alphabetical (a-z)': nameSort,
  'Alphabetical (z-a)': reverseNameSort,
  'Cost (ascending)': costSort,
  'Cost (descending)': reverseCostSort
}

const SectionControls: React.FC = () => {
  const {
    selectedSort,
    setSelectedSort,
    combinedCards,
    commanderCount,
    otherCount
  } = useCardState()

  const totalPrice = React.useMemo(() => {
    let total = 0

    combinedCards.forEach(card => {
      total += card.amount * +card.card.prices.usd
    })

    return total
  }, [combinedCards])

  const { data: price, isLoading: isLoadingMoney } = useSWR<number>(() =>
    totalPrice > 0 ? `/money?amount=${totalPrice}` : null
  )

  return (
    <div className={titleClassName}>
      <div className='underline'>
        Total Cards ({commanderCount + otherCount})
      </div>

      {!isLoadingMoney && (
        <div className='ml-4 underline'>
          Total Price: ${(price ?? 0).toFixed(2)} CAD
        </div>
      )}

      <Select
        label='Sort'
        labelClass='text-3xl'
        options={Object.keys(sortMap)}
        value={selectedSort.name}
        onChange={val =>
          setSelectedSort({ name: val as string, sort: sortMap[val as string] })
        }
        className='flex-1 justify-end'
      />
    </div>
  )
}

export default SectionControls
