import styled, { css } from 'styled-components'

const resetStyles = css`
  display: inline-block;

  margin: 0;

  font-size: 1rem;
  font-family: inherit;
  text-align: center;
  text-decoration: none;

  appearance: none;
  outline: none;
`

const buttonStyles = css`
  transition: color 250ms ease-in-out, background-color 250ms ease-in-out,
    transform 150ms ease;

  border: 0.0625rem solid ${({ theme }) => theme.foreground};
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  color: ${({ theme }) => theme.text};

  cursor: pointer;
`

const StyledButton = styled.button`
  ${resetStyles};

  ${buttonStyles};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.foregroundDark};

    color: black;
  }

  &:active :not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    border-color: gray;

    background-color: ${({ theme }) => theme.accent};
    cursor: default;

    color: ${({ theme }) => theme.background};
  }
`

export default StyledButton
