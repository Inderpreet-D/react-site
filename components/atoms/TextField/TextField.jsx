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
`;

const StyledInput = styled.input`
  ${resetStyles};

  padding: 1rem;
  border: 0.0625rem solid ${({ theme }) => theme.background};
  border-radius: 0.25rem;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus {
    border-color: ${({ theme }) => theme.foreground};
  }
`;

const TextField = ({ className, ...props }) => (
  <div className={className}>
    <StyledInput {...props} />
  </div>
);

export default TextField;
