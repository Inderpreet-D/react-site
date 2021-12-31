import Container from '../../atoms/Container'
import Button from '../../atoms/Button'
import TextField from '../../atoms/TextField'
import Canvas from '../../atoms/Canvas'

import { useLife } from '../../../providers/LifeProvider'
import { Controls } from './styles'

const DELAY = 10

const GoL = () => {
  const [running, setRunning] = React.useState(false)
  const [delay, setDelay] = React.useState(DELAY)
  const {
    board,
    width,
    height,
    tick,
    changeWidth,
    changeHeight,
    toggle,
    reset
  } = useLife()

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (running) {
        tick()
      }
    }, delay)

    return () => {
      clearInterval(timer)
    }
  }, [running, tick, delay])

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
      setRunning(false)

      const elem = e.target as HTMLCanvasElement
      const elemLeft = elem.offsetLeft + elem.clientLeft
      const elemTop = elem.offsetTop + elem.clientTop

      const x = e.pageX - elemLeft
      const y = e.pageY - elemTop

      const cellWidth = elem.width / width
      const cellHeight = elem.height / height

      toggle(Math.floor(x / cellWidth), Math.floor(y / cellHeight))
    },
    [width, height, toggle]
  )

  return (
    <Container style={{ width: '95%' }}>
      <Controls>
        <div>
          <TextField
            value={width}
            placeholder='Width'
            type='number'
            onChange={e => changeWidth(+e.target.value)}
          />

          <TextField
            value={height}
            placeholder='Height'
            type='number'
            onChange={e => changeHeight(+e.target.value)}
          />
        </div>

        <TextField
          value={delay}
          placeholder='Delay'
          type='number'
          onChange={e => setDelay(+e.target.value)}
        />

        <div>
          <Button onClick={() => setRunning(old => !old)}>
            {running ? 'Stop' : 'Start'}
          </Button>

          <Button
            onClick={() => {
              setRunning(false)
              reset()
            }}
          >
            Reset
          </Button>
        </div>
      </Controls>

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
