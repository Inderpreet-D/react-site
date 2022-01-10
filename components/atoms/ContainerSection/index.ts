import styled from 'styled-components'

const ContainerSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 0 1rem;

  & > :last-child {
    margin-bottom: 0;
  }
`

export default ContainerSection
