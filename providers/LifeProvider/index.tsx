import React from 'react'

type ContextType = {
  board: boolean[][]
  width: number
  height: number
  tick: () => void
  changeWidth: (width: number) => void
  changeHeight: (height: number) => void
  toggle: (x: number, y: number) => void
  reset: () => void
}

const LifeContext = React.createContext<ContextType | null>(null)

const INITIAL = {
  width: 160,
  height: 47
}

const LifeProvider: React.FC = ({ children }) => {
  const [board, setBoard] = React.useState<boolean[][]>(
    new Array(INITIAL.height)
      .fill(0)
      .map(_ => new Array(INITIAL.width).fill(false))
  )
  const [width, setWidth] = React.useState(INITIAL.width)
  const [height, setHeight] = React.useState(INITIAL.height)

  const tick = React.useCallback(() => {
    const newCells: boolean[][] = []

    for (let y = 0; y < height; y++) {
      newCells.push(new Array(width).fill(false))

      for (let x = 0; x < width; x++) {
        const val = board[y][x]
        let newVal: boolean

        const indices = [
          [y - 1, x - 1],
          [y - 1, x],
          [y - 1, x + 1],
          [y, x - 1],
          [y, x + 1],
          [y + 1, x - 1],
          [y + 1, x],
          [y + 1, x + 1]
        ]
        const surrounding = indices
          .map(([y, x]) => (board[y] ? board[y][x] : false))
          .filter(Boolean).length

        if (val && [2, 3].includes(surrounding)) {
          newVal = true
        } else if (!val && surrounding === 3) {
          newVal = true
        } else {
          newVal = false
        }

        newCells[y][x] = newVal
      }
    }

    setBoard(newCells)
  }, [height, width, board])

  const resize = React.useCallback(
    (width: number, height: number) => {
      setWidth(width)
      setHeight(height)

      const newBoard = []
      for (let y = 0; y < height; y++) {
        const row = []
        for (let x = 0; x < width; x++) {
          row.push(board[y] ? board[y][x] : false)
        }
        newBoard.push(row)
      }
      setBoard(newBoard)
    },
    [board]
  )

  const changeWidth = React.useCallback(
    (width: number) => {
      resize(width, height)
    },
    [resize, height]
  )

  const changeHeight = React.useCallback(
    (height: number) => {
      resize(width, height)
    },
    [resize, width]
  )

  const toggle = React.useCallback((x: number, y: number) => {
    setBoard(old => {
      const newBoard = [...old]
      newBoard[y] = [...old[y]]
      newBoard[y][x] = !old[y][x]
      return newBoard
    })
  }, [])

  const reset = React.useCallback(() => {
    setBoard(new Array(height).fill(0).map(_ => new Array(width).fill(false)))
  }, [width, height])

  return (
    <LifeContext.Provider
      value={{
        board,
        width,
        height,
        tick,
        changeWidth,
        changeHeight,
        toggle,
        reset
      }}
    >
      {children}
    </LifeContext.Provider>
  )
}

export default LifeProvider

export const useLife = () => React.useContext(LifeContext) as ContextType
