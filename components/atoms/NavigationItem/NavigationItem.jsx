import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 3.125rem;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledLink = styled.a`
  text-decoration: none;
  height: 100%;
  padding: 1rem 0.625rem;
  width: 100%;
  box-sizing: border-box;
  display: block;

  &:hover,
  &:active,
  &.active {
    color: ${({ theme }) => theme.foreground};
    background-color: ${({ theme }) => theme.backgroundLight};
    border-bottom: 0.25rem solid ${({ theme }) => theme.foregroundDark};
  }
`;

const NavigationItem = ({ link, children }) => {
  const { pathname } = useRouter();
  const activeClass = pathname === link ? "active" : "";

  return (
    <Link href={link}>
      <StyledItem>
        <StyledLink className={activeClass}>{children}</StyledLink>
      </StyledItem>
    </Link>
  );
};

export default NavigationItem;
