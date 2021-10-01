import {
  StyledHeader,
  StyledDesktopItems,
  StyledMobileItems,
} from "./Header.styles";
import NavigationItem from "../NavigationItem";
import Sidebar from "../Sidebar";
import routes from "../../../utilities/routes";

const HEADER_ITEMS = Object.entries(routes).map(([key, link], i) => (
  <NavigationItem key={i} link={link}>
    {key}
  </NavigationItem>
));

const Header = () => {
  return (
    <StyledHeader>
      <StyledDesktopItems>{HEADER_ITEMS}</StyledDesktopItems>

      <StyledMobileItems>
        <Sidebar>{HEADER_ITEMS}</Sidebar>
      </StyledMobileItems>
    </StyledHeader>
  );
};

export default Header;
