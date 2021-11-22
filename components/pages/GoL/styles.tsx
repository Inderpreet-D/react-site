import styled from 'styled-components'

import Button from '../../atoms/Button'

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;

  & > div > :last-child {
    margin: 10px 0;
  }

  & > div:last-child > :first-child {
    margin-right: 10px;
  }
`

interface CellProps {
  alive: boolean
}

const Cell = styled(Button)<CellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  color: ${({ alive }) => (alive ? 'red' : 'grey')} !important;
  font-size: 10px;
  border-radius: 0;
  border-width: 1px;
  padding: 8px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div``

export { Controls, Wrapper, Row, Cell }
