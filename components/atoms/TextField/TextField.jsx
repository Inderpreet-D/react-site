import styled, { css } from "styled-components";

const resetStyles = css`
  display: inline-block;
  margin: 0;
  text-decoration: none;
  font-family: inherit;
  font-size: 1.25rem;
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  width: 100%;
  padding: 1rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
  text-align: center;
`;

const StyledInput = styled.input`
  ${resetStyles};

  border: 0.0625rem solid ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus {
    border-color: ${({ theme }) => theme.foreground};
  }

  &:focus::placeholder {
    line-height: 3.75rem;
    font-size: 0.7rem;
    letter-spacing: 0.25rem;
  }
`;

const TextField = ({ className, ...props }) => (
  <div className={className}>
    <StyledInput {...props} />
  </div>
);

export default TextField;
