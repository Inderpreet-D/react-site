import { FaLessThan } from '@react-icons/all-files/fa/FaLessThan'
import { FaGreaterThan } from '@react-icons/all-files/fa/FaGreaterThan'

import { Controls, ControlButton } from './styles'

type ControlProps = {
  current: number
  last: number
  onForward: () => void
  onBack: () => void
}

const Control: React.FC<ControlProps> = ({
  current,
  last,
  onForward,
  onBack,
  ...props
}) => (
  <Controls {...props}>
    <ControlButton
      aria-label='Backward'
      disabled={current === 0}
      onClick={onBack}
    >
      <FaLessThan />
    </ControlButton>

    <span>
      {current + 1} / {last}
    </span>

    <ControlButton
      aria-label='Forward'
      disabled={current === last - 1}
      onClick={onForward}
    >
      <FaGreaterThan />
    </ControlButton>
  </Controls>
)

export default Control
