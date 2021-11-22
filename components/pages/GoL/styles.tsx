import styled from 'styled-components'

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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export { Controls, Wrapper }
