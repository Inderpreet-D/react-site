import styled from "styled-components";

import NavigationItem from "../NavigationItem";
import Sidebar from "../Sidebar";

import breakpoints from "../../../breakpoints";
import routes from "../../../routes";

const StyledHeader = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.accent};
`;

const StyledDesktopItems = styled.div`
  display: none;
  overflow: auto;

  @media ${breakpoints.laptop}, ${breakpoints.desktop} {
    display: flex;
  }
`;

const StyledMobileItems = styled.div`
  display: none;

  @media ${breakpoints.mobile}, ${breakpoints.tablet} {
    display: flex;
  }
`;

const Header = () => {
  const headerItems = Object.keys(routes).map((key, i) => (
    <NavigationItem key={i} link={routes[key]}>
      {key}
    </NavigationItem>
  ));

  return (
    <StyledHeader>
      <StyledDesktopItems>{headerItems}</StyledDesktopItems>

      <StyledMobileItems>
        <Sidebar>{headerItems}</Sidebar>
      </StyledMobileItems>
    </StyledHeader>
  );
};

export default Header;
