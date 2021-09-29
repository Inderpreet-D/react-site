import { FaLessThan, FaGreaterThan } from 'react-icons/fa'

import { Controls, ControlButton } from './styles'

type ControlProps = {
  current: number
  last: number
  onForward: () => void
  onBack: () => void
}

const Control: React.FunctionComponent<ControlProps> = ({
  current,
  last,
  onForward,
  onBack,
  ...props
}) => (
  <Controls {...props}>
    <ControlButton disabled={current === 0} onClick={onBack}>
      <FaLessThan />
    </ControlButton>

    <span>
      {current + 1} / {last}
    </span>

    <ControlButton disabled={current === last - 1} onClick={onForward}>
      <FaGreaterThan />
    </ControlButton>
  </Controls>
)

export default Control
