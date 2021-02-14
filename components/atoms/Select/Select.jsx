import styled, { css } from "styled-components";
import alpha from "color-alpha";

const baseStyles = css`
  transition: all 0.2s ease-in-out;

  user-select: none;
`;

const StyledLabel = styled.div`
  ${baseStyles};
`;

const StyledSelect = styled.div`
  position: absolute;
  bottom: 0.5rem;

  color: ${({ theme }) => theme.foregroundDark};

  ${baseStyles};
`;

const StyledOption = styled.div`
  padding: 0.25rem 0.5rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  color: ${({ theme }) => theme.foregroundDark};

  &:hover {
    background-color: ${({ theme }) => theme.background};

    color: ${({ theme }) => theme.foreground};
  }

  ${baseStyles};
`;

const StyledOptionList = styled.div`
  position: absolute;
  z-index: 2;
  top: calc(100% - 0.125rem);
  left: -0.0625rem;
  flex-direction: column;

  display: flex;

  overflow: hidden auto;

  border: 0.0625rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 0 0 0.25rem 0.25rem;
  box-sizing: border-box;
  width: calc(100% + 0.125rem);
  max-height: 20rem;

  ${baseStyles};
`;

const containerFocusStyles = css`
  border-color: ${({ theme }) => theme.foreground};

  & ${StyledLabel} {
    color: ${({ theme }) => alpha(theme.text, 0.5)};
  }

  & ${StyledSelect} {
    color: ${({ theme }) => theme.foreground};
  }
`;

const StyledContainer = styled.div`
  position: relative;
  z-index: 2;
  flex-direction: column;

  display: flex;

  border: 0.0625rem solid ${({ theme }) => theme.background};
  border-radius: 0.25rem;
  box-sizing: border-box;
  height: 3.875rem;
  padding: 0.5rem;

  cursor: pointer;

  color: ${({ theme }) => theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.foregroundDark};
  }

  ${baseStyles};
  ${({ open }) => open && containerFocusStyles};
`;

const StyledBackdrop = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
`;

const Select = ({ label, options, value, onChange, className }) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef();
  const backdropRef = React.useRef();

  const toggleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleContainerClick = (e) => {
    if (
      e.target === containerRef.current ||
      e.target.parentElement === containerRef.current
    ) {
      toggleOpen(e);
    }
  };

  const handleOptionClick = (opt) => (e) => {
    toggleOpen(e);
    onChange && onChange({ target: { value: opt } });
  };

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      toggleOpen(e);
    }
  };

  return (
    <>
      <StyledContainer
        open={open}
        className={className}
        onClick={handleContainerClick}
        ref={containerRef}
      >
        <StyledLabel>{label}</StyledLabel>

        <StyledSelect>{value}</StyledSelect>

        {open && (
          <StyledOptionList>
            {options.map((opt, i) => (
              <StyledOption key={i} onClick={handleOptionClick(opt)}>
                {opt}
              </StyledOption>
            ))}
          </StyledOptionList>
        )}
      </StyledContainer>

      {open && (
        <StyledBackdrop onClick={handleBackdropClick} ref={backdropRef} />
      )}
    </>
  );
};

export default Select;
