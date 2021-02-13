import styled from "styled-components";
import alpha from "color-alpha";

const StyledLabel = styled.label`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;

  transform-origin: top left;

  transition: all 0.1s ease-in-out;

  font-size: 1rem;
`;

const StyledSelect = styled.select`
  transform-origin: top left;

  transition: all 0.1s ease-in-out;

  margin: 1rem 0 0 0;
  border: none;
  box-sizing: border-box;
  width: calc(calc(1 / 1.75) * 100%);
  padding: 0rem;

  outline: none;
  appearance: none;

  background-color: transparent;

  font-size: 1rem;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.foregroundDark};
`;

const StyledOption = styled.option``;

const StyledContainer = styled.div`
  position: relative;
  justify-content: center;

  display: flex;

  border: 0.0625rem solid ${({ theme }) => theme.background};
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 1rem 0 0.75rem 0;

  cursor: text;

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.foreground};
  }

  &:focus-within > ${StyledLabel} {
    top: 0.25rem;
    transform: scale(0.75);
    color: ${({ theme }) => alpha(theme.text, 0.5)};
  }

  &:focus-within > ${StyledSelect} {
    transform: scale(1.75);
    margin: 0.5rem 0 0.5rem -42.75%;
    color: ${({ theme }) => theme.foreground};
  }
`;

const Select = ({
  id = "select",
  label = "",
  className,
  options,
  ...props
}) => {
  const selectRef = React.createRef();

  const handleClick = () => {};

  return (
    <StyledContainer
      className={className}
      onClick={() => selectRef.current.focus()}
    >
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledSelect {...props} id={id} ref={selectRef} menuIsOpen={true}>
        {options.map((opt, i) => (
          <option key={i} value={opt} onClick={() => selectRef.current.focus()}>
            {opt}
          </option>
        ))}
      </StyledSelect>
    </StyledContainer>
  );
};

export default Select;
