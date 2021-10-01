import styled from 'styled-components'

import Container from '../../atoms/Container'
import TextField from '../../atoms/TextField'

const StyledContainer = styled(Container)`
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const StyledHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 1rem;
`

const StyledControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledTextField = styled(TextField)`
  width: 60%;
  margin-right: 1rem;
`

export { StyledContainer, StyledHolder, StyledControls, StyledTextField }
