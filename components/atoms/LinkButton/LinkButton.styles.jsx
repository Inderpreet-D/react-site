import styled from "styled-components";

const StyledLink = styled.a`
  color: ${({ theme }) => theme.text};

  &:visited {
    color: ${({ theme }) => theme.foregroundDark};
  }
`;

export default StyledLink;
