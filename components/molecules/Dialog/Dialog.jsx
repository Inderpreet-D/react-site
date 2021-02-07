import styled from "styled-components";

import Container from "../../atoms/Container";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogActions from "./DialogActions";

const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  opacity: 0.75;
  z-index: 1;
`;

const StyledDialog = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => width};
  z-index: 2;
`;

const Dialog = ({ open, onClose, title, actions, children, width = "50%" }) => {
  const bgRef = React.useRef();

  const handleBGClick = (e) => {
    e.stopPropagation();
    if (e.target === bgRef.current) {
      onClose();
    }
  };

  return !open ? null : (
    <>
      <StyledBackdrop onClick={handleBGClick} ref={bgRef} />

      <StyledDialog width={width}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </StyledDialog>
    </>
  );
};

export default Dialog;
