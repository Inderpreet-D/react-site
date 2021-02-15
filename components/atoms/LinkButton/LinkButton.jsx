import styled from "styled-components";
import Link from "next/link";

import Button from "../Button";

const StyledLink = styled.a`
  color: ${({ theme }) => theme.text};

  &:visited {
    color: ${({ theme }) => theme.background};
  }
`;

const LinkButton = ({ href, title }) => {
  const target = href.startsWith("/") ? "" : "_blank";

  return (
    <Button size="medium">
      <Link href={href} passHref>
        <StyledLink target={target}>{title}</StyledLink>
      </Link>
    </Button>
  );
};

export default LinkButton;
