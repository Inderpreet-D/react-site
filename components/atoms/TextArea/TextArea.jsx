import styled, { css } from "styled-components";

const resetStyles = css`
  display: inline-block;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: 1rem;
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  width: 100%;
  resize: vertical;
  padding: 1rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
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

const TextArea = ({ className, ...props }) => (
  <div className={className}>
    <StyledArea {...props} />
  </div>
);

export default TextArea;
