import { FaLessThan, FaGreaterThan } from "react-icons/fa";

import { StyledControls, StyledControlButton } from "./Control.styles";

const Control = ({ current, last, onForward, onBack }) => (
  <StyledControls>
    <StyledControlButton disabled={current === 0} onClick={onBack}>
      <FaLessThan />
    </StyledControlButton>

    <span>
      {current + 1} / {last}
    </span>

    <StyledControlButton disabled={current === last - 1} onClick={onForward}>
      <FaGreaterThan />
    </StyledControlButton>
  </StyledControls>
);

export default Control;
