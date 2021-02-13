import styled from "styled-components";
import alpha from "color-alpha";

const StyledLabel = styled.label`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;

  transition: all 0.1s ease-in-out;

  user-select: none;

  font-size: 1rem;
`;

const StyledSelect = styled.select`
  transition: all 0.1s ease-in-out;

  margin: 0;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 3.5rem;
  padding: 1.5rem 0 0 0.5rem;

  cursor: inherit;

  outline: none;
  appearance: none;

  background-color: transparent;

  font-size: 1rem;
  font-family: inherit;
  text-decoration: none;
  color: ${({ theme }) => theme.foregroundDark};
`;

const StyledOption = styled.option`
  color: ${({ theme }) => theme.foregroundDark};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const StyledContainer = styled.div`
  position: relative;

  border: 0.0625rem solid ${({ theme }) => theme.background};
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding: 0;

  cursor: pointer;

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.foreground};
  }

  &:focus-within > ${StyledLabel} {
    color: ${({ theme }) => alpha(theme.text, 0.5)};
  }

  &:focus-within > ${StyledSelect} {
    color: ${({ theme }) => theme.foreground};
  }
`;

const Select = ({
  id = "select",
  label = "",
  className,
  options,
  onChange,
  ...props
}) => {
  const selectRef = React.useRef();

  const handleClick = (e) => {
    selectRef.current.blur();
    onChange && onChange(e);
  };

  return (
    <StyledContainer className={className}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledSelect {...props} id={id} onChange={() => {}} ref={selectRef}>
        {options.map((opt, i) => (
          <StyledOption key={i} value={opt} onClick={handleClick}>
            {opt}
          </StyledOption>
        ))}
      </StyledSelect>
    </StyledContainer>
  );
};

export default Select;
