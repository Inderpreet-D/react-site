import Container from '../../atoms/Container'
import Button from '../../atoms/Button'
import TextField from '../../atoms/TextField'
import Canvas from '../../atoms/Canvas'

import {
  selectLife,
  changeWidth,
  changeHeight,
  toggle,
  reset,
  toggleRunning,
  stopRunning,
  tick
} from '../../../slices/life'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

const DELAY = 10

const GoL = () => {
  const dispatch = useAppDispatch()
  const { board, width, height, running } = useAppSelector(selectLife)

  const [delay, setDelay] = React.useState(DELAY)

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, _: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cellWidth = canvas.width / width
      const cellHeight = canvas.height / height

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          const x = col * cellWidth
          const y = row * cellHeight
          ctx.fillStyle = board[row][col] ? 'white' : '#45a29e'
          ctx.fillRect(x, y, cellWidth, cellHeight)
        }
      }
    },
    [width, height, board]
  )

  const handleClick: React.MouseEventHandler<HTMLCanvasElement> = React.useCallback(
    e => {
      const elem = e.target as HTMLCanvasElement

      const rect = elem.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cellWidth = elem.width / width
      const cellHeight = elem.height / height

      dispatch(
        toggle({ x: Math.floor(x / cellWidth), y: Math.floor(y / cellHeight) })
      )
    },
    [width, height, dispatch]
  )

  return (
    <Container style={{ width: '95%' }}>
      <div className='flex flex-col items-center justify-center mb-5'>
        <div>
          <TextField
            value={width}
            placeholder='Width'
            type='number'
            onChange={e => dispatch(changeWidth(+e.target.value))}
          />

          <TextField
            value={height}
            placeholder='Height'
            type='number'
            onChange={e => dispatch(changeHeight(+e.target.value))}
            className='mx-0 my-3'
          />
        </div>

        <TextField
          value={delay}
          placeholder='Delay'
          type='number'
          min={0}
          onChange={e => {
            setDelay(+e.target.value)
            dispatch(stopRunning())
          }}
        />

        <div className='flex my-3'>
          <Button
            onClick={() => dispatch(toggleRunning(delay))}
            className='mr-3'
          >
            {running ? 'Stop' : 'Start'}
          </Button>

          <Button onClick={() => dispatch(tick())} className='mr-3'>
            Step
          </Button>

          <Button onClick={() => dispatch(reset())}>Reset</Button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Canvas
          draw={draw}
          onClick={handleClick}
          width='1600px'
          height='470px'
          style={{
            border: '1px solid black',
            boxSizing: 'border-box',
            cursor: 'pointer'
          }}
        />
      </div>
    </Container>
  )
}

export default GoL
