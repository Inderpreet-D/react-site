import { useAppSelector } from "../../../hooks/redux";

import NavigationItem from "../NavigationItem";
import Sidebar from "../Sidebar";
import routes from "../../../utilities/routes";
import Spacer from "../Spacer";

import { selectAuth } from "../../../slices/auth";

const HeaderItems = () => {
  const { isLoggedIn } = useAppSelector(selectAuth);

  return (
    <>
      {Object.entries(routes).map(([key, link], i) => (
        <NavigationItem key={i} link={link}>
          {key}
        </NavigationItem>
      ))}

      <Spacer />

      <NavigationItem link="/account">
        {isLoggedIn ? "Account" : "Login"}
      </NavigationItem>
    </>
  );
};
const className = "flex border-b border-b-dark-light box-border bg-dark-dark";

const Header = () => {
  return (
    <header className={className}>
      <nav className="hidden overflow-auto w-full lg:flex">
        <HeaderItems />
      </nav>

      <div className="flex lg:hidden">
        <Sidebar>
          <HeaderItems />
        </Sidebar>
      </div>
    </header>
  );
};

export default Header;
