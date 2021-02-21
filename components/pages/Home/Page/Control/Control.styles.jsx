import styled from "styled-components";

import Button from "../../../../atoms/Button";

const StyledControlButton = styled(Button)`
  justify-content: center;
  align-items: center;

  display: flex;

  height: 100%;
`;

const StyledControls = styled.div`
  justify-content: center;
  align-items: center;

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

export { StyledControls, StyledControlButton };
