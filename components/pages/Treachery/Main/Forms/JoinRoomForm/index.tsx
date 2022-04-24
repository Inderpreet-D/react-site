import { FormProps } from '../types'

import StyledTextField from './styles'

const JoinRoomForm: React.FC<FormProps> = ({ values: { code }, onChange }) => (
  <StyledTextField
    onChange={e => onChange('code')(e.target.value)}
    value={code}
    placeholder='4-Letter Room Code'
    aria-label='Room code'
  />
)

export default JoinRoomForm
