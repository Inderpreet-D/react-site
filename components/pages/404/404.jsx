import Link from "next/link";
import styled from "styled-components";

import Container from "../../atoms/Container";
import Page from "../../templates/Page";

const StyledErrorBox = styled(Container)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.foreground};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Custom404 = () => {
  return (
    <Page title="404 - Page Not Found">
      <StyledErrorBox>
        <h1>Page Not Found</h1>
        <Link href="/" replace>
          <StyledLink>Go back home</StyledLink>
        </Link>
      </StyledErrorBox>
    </Page>
  );
};

export default Custom404;
