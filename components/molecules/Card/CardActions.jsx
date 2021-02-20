import { StyledActions } from "./Card.styles";
import Spacer from "../../atoms/Spacer";

const CardActions = ({ children, alignCenter, alignLeft, alignRight }) => (
  <StyledActions>
    {(alignCenter || alignRight) && <Spacer />}
    {children}
    {(alignCenter || alignLeft) && <Spacer />}
  </StyledActions>
);

export default CardActions;
