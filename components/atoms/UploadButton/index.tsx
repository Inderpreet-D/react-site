import { StyledButton, StyledLabel } from './styles'

const UploadButton = ({ children, onFileSelected }) => (
  <StyledButton>
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
