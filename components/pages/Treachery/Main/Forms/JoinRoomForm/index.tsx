import { FormProps } from '../types'

import StyledTextField from './styles'

const JoinRoomForm: React.FC<FormProps> = ({ values: { code }, onChange }) => (
  <StyledTextField
    onChange={onChange('code')}
    value={code}
    placeholder='4-Letter Room Code'
  />
)

export default JoinRoomForm
