import styled from "styled-components";

import Spacer from "../../atoms/Spacer";

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardActions = ({ children, alignCenter, alignLeft, alignRight }) => {
  return (
    <StyledActions>
      {(alignCenter || alignRight) && <Spacer />}
      {children}
      {(alignCenter || alignLeft) && <Spacer />}
    </StyledActions>
  );
};

export default CardActions;
