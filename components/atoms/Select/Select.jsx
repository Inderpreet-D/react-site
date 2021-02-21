import {
  StyledContainer,
  StyledLabel,
  StyledSelect,
  StyledOptionList,
  StyledOption,
  StyledBackdrop,
} from "./Select.styles";

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
        onClick={handleContainerClick}
        className={className}
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
