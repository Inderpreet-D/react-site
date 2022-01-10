import styled from 'styled-components'

const HorizontalList = styled.div`
  display: flex;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 0.5rem;

  & > :not(:last-child) {
    margin-right: 1rem;
  }
`

export default HorizontalList
