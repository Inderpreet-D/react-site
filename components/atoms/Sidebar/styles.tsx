import styled from 'styled-components'

const StyledButton = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  width: 100%;
  height: 3.125rem;
  padding: 0 0.5625rem;

  cursor: pointer;

  user-select: none;
`

const StyledBackdrop = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  opacity: 0.5;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.backgroundLight};
`

type ModalProps = {
  open: boolean
}

const width = 25
const StyledModal = styled.div<ModalProps>`
  position: absolute;
  z-index: 2;
  top: 0;
  left: ${({ open }) => (open ? '0' : `-${width}%`)};

  transition: left 0.5s;

  border-right: 0.0625rem solid ${({ theme }) => theme.accent};
  box-sizing: border-box;
  width: ${`${width}%`};
  height: 100vh;

  background-color: ${({ theme }) => theme.background};
`

export { StyledButton, StyledBackdrop, StyledModal }
