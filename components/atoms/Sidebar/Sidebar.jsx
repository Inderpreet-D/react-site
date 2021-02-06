import styled from "styled-components";
import { FaBars } from "react-icons/fa";

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.125rem;
  width: 100%;
  padding: 0 0.5625rem;
  cursor: pointer;
  user-select: none;
`;

const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundLight};
  opacity: 0.5;
  z-index: 1;
`;

const width = 25;
const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: ${({ open }) => (open ? "0" : `-${width}%`)};
  width: ${`${width}%`};
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  z-index: 2;
  transition: left 0.5s;
  box-sizing: border-box;
  border-right: 0.0625rem solid ${({ theme }) => theme.accent};
`;

const Sidebar = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback((e) => {
    e.stopPropagation();
    setOpen(false);
  }, []);

  const handleMenuClick = React.useCallback((e) => {
    e.stopPropagation();
    setOpen(true);
  }, []);

  return (
    <>
      <StyledButton onClick={handleMenuClick}>
        <FaBars size="2em" />
      </StyledButton>

      {open && <StyledBackdrop onClick={handleClose} />}

      <StyledModal open={open}>{children}</StyledModal>
    </>
  );
};

export default Sidebar;
