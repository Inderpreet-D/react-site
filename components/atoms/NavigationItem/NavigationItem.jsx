import Link from "next/link";
import { useRouter } from "next/router";

const StyledHolder = styled.div`
  height: 3.125rem;
  width: 100%;
  cursor: pointer;
  user-select: none;
`;

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 0.25rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 0.25rem solid transparent;
  transition: all 0.75s;

  &:hover,
  &:hover,
  &.active {
    color: ${({ theme }) => theme.foreground};
  }

  @media ${breakpoints.laptop}, ${breakpoints.desktop} {
    &:hover,
    &:active,
    &.active {
      background-color: ${({ theme }) => theme.background};
      border-bottom: 0.25rem solid ${({ theme }) => theme.foregroundDark};
    }
  }

  @media ${breakpoints.mobile}, ${breakpoints.tablet} {
    &:hover,
    &:active,
    &.active {
      background-color: ${({ theme }) => theme.backgroundLight};
      border-right: 0.25rem solid ${({ theme }) => theme.foregroundDark};
      border-left: 0.25rem solid ${({ theme }) => theme.foregroundDark};
    }
  }
`;

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
