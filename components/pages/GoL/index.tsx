import Container from '../../atoms/Container'
import Button from '../../atoms/Button'
import TextField from '../../atoms/TextField'

import { useLife } from '../../../providers/LifeProvider'
import { Controls, Wrapper, Row, Cell } from './styles'

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

      <Wrapper>
        {board.map((row, y) => (
          <Row key={y}>
            {row.map((alive, x) => (
              <Cell key={x} alive={alive} onClick={() => toggle(x, y)}>
                {alive ? '🔥' : ' '}
              </Cell>
            ))}
          </Row>
        ))}
      </Wrapper>
    </Container>
  )
}

export default GoL
