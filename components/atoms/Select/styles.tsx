import styled, { css } from 'styled-components'
import alpha from 'color-alpha'

const baseStyles = css`
  transition: all 0.2s ease-in-out;

  user-select: none;
`

const StyledLabel = styled.div`
  ${baseStyles};
`

const StyledSelect = styled.div`
  ${baseStyles};

  position: absolute;
  bottom: 0.5rem;

  color: ${({ theme }) => theme.foregroundDark};
`

const StyledOption = styled.div`
  ${baseStyles};

  padding: 0.25rem 0.5rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  color: ${({ theme }) => theme.foregroundDark};

  &:hover {
    background-color: ${({ theme }) => theme.background};

    color: ${({ theme }) => theme.foreground};
  }
`

const StyledOptionList = styled.div`
  ${baseStyles};

  position: absolute;
  z-index: 2;
  top: calc(100% - 0.125rem);
  left: -0.0625rem;
  flex-direction: column;

  display: flex;

  overflow: hidden auto;

  border: 0.0625rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 0 0 0.25rem 0.25rem;
  box-sizing: border-box;
  min-width: fit-content;
  width: calc(100% + 0.125rem);
  max-height: 20rem;
`

const containerFocusStyles = css`
  border-color: ${({ theme }) => theme.foreground};

  & ${StyledLabel} {
    color: ${({ theme }) => alpha(theme.text, 0.5)};
  }

  & ${StyledSelect} {
    color: ${({ theme }) => theme.foreground};
  }
`

type ContainerProps = {
  open: boolean
}
const StyledContainer = styled.div<ContainerProps>`
  ${baseStyles};
  ${({ open }) => open && containerFocusStyles};

  position: relative;
  z-index: 2;
  flex-direction: column;

  display: flex;

  border: 0.0625rem solid ${({ theme }) => theme.background};
  border-radius: 0.25rem;
  box-sizing: border-box;
  height: 3.875rem;
  padding: 0.5rem;

  cursor: pointer;

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }
`

const StyledBackdrop = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
`

export {
  StyledContainer,
  StyledLabel,
  StyledSelect,
  StyledOptionList,
  StyledOption,
  StyledBackdrop
}
