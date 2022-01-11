import styled, { css } from 'styled-components'

export const TableHolder = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  margin: 1rem 0;
  width: 100%;
  border-collapse: collapse;

  & th,
  & td {
    padding: 6px;
    text-align: left;
  }
`

export const HeaderRow = styled.tr`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.accent};
`

const winnerRowStyles = css`
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
`
type TRProps = {
  winner?: boolean
}
export const Row = styled.tr<TRProps>`
  border-bottom: 1px solid ${({ theme }) => theme.foregroundDark};
  color: ${({ theme }) => theme.accent};
  transition: all 500ms;

  ${({ winner }) => winner && winnerRowStyles};

  &:hover {
    background-color: ${({ theme }) => theme.foregroundDark};
    color: ${({ theme }) => theme.text};
  }
`

export const HeaderCell = styled.th``

export const DataCell = styled.td``
