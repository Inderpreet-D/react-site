import styled from 'styled-components'

import Container from '../../atoms/Container'

type DialogProps = {
  width: string
}
const StyledDialog = styled(Container)<DialogProps>`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;

  transform: translateX(-50%);

  width: ${({ width }) => width};
`

const StyledTitle = styled.div`
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 500;
  color: ${({ theme }) => theme.foreground};
  letter-spacing: 0.0075em;
`

const StyledContent = styled.div`
  overflow: hidden auto;

  margin: 1.5rem 0;
`

const StyledActions = styled.div`
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 auto;

  display: flex;
`

const StyledBackdrop = styled.div`
  position: absolute;
  z-index: 1;

  opacity: 0.75;

  width: 2000vw;
  height: 2000vh;

  transform: translate(-50%, -50%);

  background-color: ${({ theme }) => theme.background};
`

export {
  StyledDialog,
  StyledTitle,
  StyledContent,
  StyledActions,
  StyledBackdrop
}
