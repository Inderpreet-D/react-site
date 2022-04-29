import styled from 'styled-components'

import TextField from '../../atoms/TextField'
import TextArea from '../../atoms/TextArea'

const StyledButtonHolder = styled.div`
  justify-content: center;

  display: flex;

  margin-bottom: 1.25rem;
`

const StyledTextFieldHolder = styled.div`
  justify-content: center;

  display: flex;

  margin-bottom: 1.25rem;
`

const StyledTextField = styled(TextField)`
  width: 70%;
`

const StyledHeader = styled.div`
  margin: 1.25rem 0;

  font-size: 1.75rem;
  font-weight: 300;
  text-decoration: underline;
`

const StyledCardBlock = styled.div`
  grid-template-columns: 25% 25% 25% 25%;

  display: grid;

  width: 100%;
  padding: 0;
`

const StyledTextArea = styled(TextArea)`
  width: 100%;
  height: 100%;
`

export {
  StyledButtonHolder,
  StyledTextFieldHolder,
  StyledTextField,
  StyledHeader,
  StyledCardBlock,
  StyledTextArea
}
