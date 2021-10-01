import styled from "styled-components";

import Button from "../Button";

const StyledLabel = styled.label`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;

  cursor: inherit;
`;

const StyledButton = styled(Button)`
  padding: 0 !important;
`;

export { StyledButton, StyledLabel };
