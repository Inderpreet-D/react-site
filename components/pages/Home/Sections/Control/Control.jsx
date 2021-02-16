import styled from "styled-components";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

import Button from "../../../../atoms/Button";

const StyledControlButton = styled(Button)`
  align-items: center;
  justify-content: center;

  display: flex;

  height: 100%;
`;

const StyledControls = styled.div`
  align-items: center;
  justify-content: center;

  display: flex;

  margin-bottom: 0.5rem;

  font-size: 1.5rem;

  & > ${StyledControlButton}:first-child {
    margin-right: 1rem;
  }

  & > ${StyledControlButton}:last-child {
    margin-left: 1rem;
  }
`;

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
