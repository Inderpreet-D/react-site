import { StyledContainer, StyledLabel, StyledInput } from './styles'

type TextFieldProps = React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>

const TextField: TextFieldProps = ({
  className,
  id = 'text-field',
  label = '',
  placeholder,
  ...props
}) => {
  const inputRef = React.createRef<HTMLInputElement>()

  return (
    <StyledContainer
      className={className}
      onClick={() => inputRef.current?.focus()}
    >
      <StyledLabel htmlFor={id}>{placeholder || label}</StyledLabel>
      <StyledInput id={id} ref={inputRef} {...props} />
    </StyledContainer>
  )
}

export default TextField
