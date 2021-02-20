import { StyledContainer, StyledLabel, StyledInput } from "./TextField.styles";

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
      onClick={() => inputRef.current?.focus()}
    >
      <StyledLabel htmlFor={id}>{placeholder || label}</StyledLabel>
      <StyledInput id={id} ref={inputRef} {...props} />
    </StyledContainer>
  );
};

export default TextField;
