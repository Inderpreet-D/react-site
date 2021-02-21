import {
  StyledDialog,
  StyledTitle,
  StyledContent,
  StyledActions,
  StyledBackdrop,
} from "./Dialog.styles";

const Dialog = ({ open, onClose, title, actions, children, width = "50%" }) => {
  const bgRef = React.useRef();

  const handleBGClick = (e) => {
    e.stopPropagation();
    if (e.target === bgRef.current) {
      onClose();
    }
  };

  return (
    open && (
      <>
        <StyledDialog width={width}>
          <StyledTitle>{title}</StyledTitle>
          <StyledContent>{children}</StyledContent>
          <StyledActions>{actions}</StyledActions>
        </StyledDialog>

        <StyledBackdrop onClick={handleBGClick} ref={bgRef} />
      </>
    )
  );
};

export default Dialog;
