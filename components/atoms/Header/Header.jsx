import styled from "styled-components";

import NavigationItem from "../NavigationItem";

import routes from "../../../routes";

const StyledHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.accent};
`;

const StyledItems = styled.div`
  display: flex;
`;

const Header = () => (
  <StyledHeader>
    <StyledItems>
      {Object.keys(routes).map((key, i) => (
        <NavigationItem key={i} link={routes[key]}>
          {key}
        </NavigationItem>
      ))}
    </StyledItems>
  </StyledHeader>
);

export default Header;
