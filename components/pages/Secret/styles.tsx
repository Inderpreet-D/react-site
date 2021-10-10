import styled, { css } from 'styled-components'
import alpha from 'color-alpha'

import Container from '../../atoms/Container'
import TextField from '../../atoms/TextField'

const textBlock = css`
  margin-top: 0.625rem;
  padding: 0.625rem;

  font-family: 'Courier New', Courier, monospace;
  word-break: break-word;
`

const StyledContainer = styled(Container)`
  flex-direction: column;

  display: flex;

  overflow: hidden;

  margin: 1rem;
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
`

const StyledTitle = styled.div`
  ${textBlock};

  justify-content: center;

  display: flex;

  font-size: 4.6875rem;
  line-height: 1.235;
  font-weight: bold;
  letter-spacing: 0.00735em;
  color: ${({ theme }) => theme.foreground};
`

const StyledScrollContainer = styled.div`
  flex-grow: 1;

  overflow-y: auto;
`

const StyledText = styled.div`
  ${textBlock};

  flex-shrink: 1;

  transition: background-color 2s;

  border-radius: 1rem;

  font-size: 1.25rem;

  &:hover {
    background-color: ${({ theme }) => alpha(theme.background, 0.5)};
  }
`

const StyledSubText = styled.div`
  ${textBlock};

  justify-content: center;

  display: flex;

  font-size: 0.9375rem;
  color: ${({ theme }) => theme.foregroundDark};
`

const StyledForm = styled.form`
  justify-content: center;

  display: flex;

  width: 100%;
  padding-top: 1.25rem;
`

const StyledTextField = styled(TextField)`
  width: 60%;
`

export {
  StyledContainer,
  StyledTitle,
  StyledScrollContainer,
  StyledText,
  StyledSubText,
  StyledForm,
  StyledTextField
}
