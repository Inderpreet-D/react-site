import Link from "next/link";

import StyledLink from "./LinkButton.styles";
import Button from "../Button";

const LinkButton = ({ href, title }) => (
  <Button>
    <Link href={href} passHref>
      <StyledLink target={href.startsWith("/") ? "" : "_blank"}>
        {title}
      </StyledLink>
    </Link>
  </Button>
);

export default LinkButton;
