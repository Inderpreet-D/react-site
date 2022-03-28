import { StyledButton, StyledLabel } from './styles'

type UploadButtonProps = {
  onFileSelected: (files: FileList | null) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({
  children,
  onFileSelected,
  ...props
}) => (
  <StyledButton {...props}>
    <StyledLabel>
      {children}
      <input
        type='file'
        onChange={e => onFileSelected(e.target.files)}
        hidden
      />
    </StyledLabel>
  </StyledButton>
)

export default UploadButton
