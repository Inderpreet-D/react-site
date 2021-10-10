import styled, { css } from "styled-components";

const resetStyles = css`
  display: inline-block;

  margin: 0;
  border: none;
  border-radius: 0.25rem;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;

  background-color: transparent;

  font-size: 1rem;
  font-family: inherit;
  text-decoration: none;

  appearance: none;
  outline: none;
  resize: vertical;
`;

const StyledArea = styled.textarea`
  ${resetStyles};

  border: 0.0625rem solid ${({ theme }) => theme.background};

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus {
    border-color: ${({ theme }) => theme.foreground};
  }

  &::placeholder {
    letter-spacing: 1px;
  }
`;

export default StyledArea;
