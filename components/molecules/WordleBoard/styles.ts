import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: auto;

  & > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: auto;

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
`

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.foregroundDark};
  border-radius: 8px;
  box-sizing: border-box;
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
`

type EmptyCellProps = {
  current?: boolean
}
export const EmptyCell = styled(Cell)<EmptyCellProps>`
  background-color: transparent;
  border-bottom: 1px solid ${({ current }) => (current ? 'white' : 'inherit')};
`

export const NormalCell = styled(Cell)`
  background-color: #1f2833;
`

export const CorrectCell = styled(Cell)`
  background-color: #00db69;
`

export const WrongPlaceCell = styled(Cell)`
  background-color: #ccac00;
`
