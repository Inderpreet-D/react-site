import Link from "next/link";
import { useRouter } from "next/router";

import { StyledHolder, StyledLink } from "./NavigationItem.styles";

const NavigationItem = ({ link, children }) => {
  const { pathname } = useRouter();
  const activeClass = pathname === link ? "active" : "";

  return (
    <Link href={link}>
      <StyledHolder>
        <StyledLink className={activeClass}>{children}</StyledLink>
      </StyledHolder>
    </Link>
  );
};

export default NavigationItem;
