import styled, { css } from "styled-components";

const resetStyles = css`
  display: inline-block;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  appearance: none;
  outline: none;
`;

const Button = styled.button`
  ${resetStyles};

  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 0.125rem solid ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
  transition: color 250ms ease-in-out, background-color 250ms ease-in-out,
    transform 150ms ease;

  &:hover,
  &:focus {
    color: black;
    background-color: ${({ theme }) => theme.foregroundDark};
  }

  &:active :not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.accent};
    border-color: gray;
  }
`;

export default Button;
