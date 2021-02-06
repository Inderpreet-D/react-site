import styled from "styled-components";
import { Button } from "@material-ui/core";
import Link from "next/link";

const StyledLink = styled.a`
  color: ${({ theme }) => theme.foreground};
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
