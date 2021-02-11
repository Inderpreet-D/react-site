import styled from "styled-components";

const StyledLabel = styled.label`
  position: absolute;
  font-size: 1rem;
  top: 0.5rem;
  left: 0.5rem;
  transform-origin: top left;
  transform: scale(1);
  transition: all 0.1s ease-in-out;
`;

const StyledInput = styled.input`
  text-decoration: none;
  font-family: inherit;
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  font-size: 1rem;
  width: calc(calc(1 / 1.75) * 100%);
  padding: 0rem;
  text-align: center;
  margin: 1rem 0 0 0;
  transition: all 0.1s ease-in-out;
  transform-origin: top left;
`;

const StyledContainer = styled.div`
  border: 0.0625rem solid ${({ theme }) => theme.background};
  padding: 1rem 0 0.25rem 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  cursor: text;

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.foreground};
  }

  &:focus-within > ${StyledLabel} {
    transform: scale(0.75);
    top: 0.25rem;
  }

  &:focus-within > ${StyledInput} {
    transform: scale(1.75);
    margin: 0.5rem 0 0.5rem -42.75%;
  }
`;

const TextField = ({
  className,
  id = "text-field",
  label = "",
  placeholder,
  ...props
}) => {
  const inputRef = React.createRef();

  return (
    <StyledContainer
      className={className}
      onClick={() => inputRef.current.focus()}
    >
      <StyledLabel htmlFor={id}>{placeholder || label}</StyledLabel>
      <StyledInput {...props} id={id} ref={inputRef} />
    </StyledContainer>
  );
};

export default TextField;
