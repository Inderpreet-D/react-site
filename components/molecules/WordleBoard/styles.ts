import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  border: 1px solid red;

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

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 3rem;
  height: 3rem;
  color: white;
  background-color: ${({ theme }) => theme.background};
  font-size: 2rem;
`
