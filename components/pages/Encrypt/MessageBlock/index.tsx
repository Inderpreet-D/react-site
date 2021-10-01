import { StyledHolder, StyledTextField, StyledText } from './styles'
import { encode } from '../../../../utilities/helpers/secret'

type MessageBlockProps = {
  value: string
  onChange: (s: string) => void
  secret: string
}

const MessageBlock: React.FC<MessageBlockProps> = ({
  value,
  onChange,
  secret
}) => (
  <StyledHolder>
    <StyledTextField
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder='Enter text to encrypt'
    />

    <StyledText>&quot;{encode(secret, value)}&quot;</StyledText>
  </StyledHolder>
)

export default MessageBlock
