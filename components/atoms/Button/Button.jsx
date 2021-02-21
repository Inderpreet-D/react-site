import styled from "styled-components";

import StyledButton from "./Button.styles";

const Button = ({ onClick, ...props }) => {
  const btnRef = React.useRef();

  const handleClick = (e) => {
    btnRef.current?.blur();

    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return <StyledButton onClick={handleClick} ref={btnRef} {...props} />;
};

export default styled(Button)``;
