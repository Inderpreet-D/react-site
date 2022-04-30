import { FormProps } from '../types'

import TextField from '../../../../../atoms/TextField'

const JoinRoomForm: React.FC<FormProps> = ({ values: { code }, onChange }) => (
  <TextField
    onChange={e => onChange('code')(e.target.value)}
    value={code}
    placeholder='4-Letter Room Code'
    aria-label='Room code'
    className='w-60'
  />
)

export default JoinRoomForm
