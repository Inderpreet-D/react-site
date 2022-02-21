import { Cell, Container, Row } from './styles'

import { useWordleState } from '../../../providers/WordleStateProvider'

const WordleBoard = () => {
  const { state } = useWordleState()

  return (
    <Container>
      <div>{state.started ? `Word is ${state.word}` : 'Loading...'}</div>

      <Row>
        {new Array(state.wordLength).fill(0).map((_, i) => (
          <Cell key={i}>{i % 10}</Cell>
        ))}
      </Row>
    </Container>
  )
}

export default WordleBoard
