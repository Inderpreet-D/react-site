import { useAppSelector } from '../../../../hooks/redux'

import Cell from '../Cell'

import { Result, getCellColors } from './helpers'
import { selectWordle } from '../../../../slices/wordle'

type LetterCellProps = {
  rowIdx: number
  cellIdx: number
}

const LetterCell: React.FC<LetterCellProps> = ({ rowIdx, cellIdx }) => {
  const state = useAppSelector(selectWordle)

  if (rowIdx > state.round) {
    return <Cell className='bg-dark-dark' />
  }

  // Determine cell color
  const result = getCellColors(state, rowIdx)
  const cellResult = result[cellIdx]

  // Get lett for this cell
  const guess = state.guesses[rowIdx]
  const letter = guess[cellIdx].toLocaleUpperCase()

  // Unchecked cell (should never happen)
  if (cellResult === Result.Unchecked) {
    return <Cell className='bg-primary-light'>{letter}</Cell>
  }

  // Incorrect cell
  if (cellResult === Result.Incorrect) {
    return <Cell className='bg-dark-dark'>{letter}</Cell>
  }

  // Correct cell
  if (cellResult === Result.Correct) {
    return <Cell className='bg-success-main'>{letter}</Cell>
  }

  // Wrong place cell
  return <Cell className='bg-yellow-600'>{letter}</Cell>
}

export default LetterCell
