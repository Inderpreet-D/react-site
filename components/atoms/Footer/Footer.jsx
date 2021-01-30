import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0.75rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
  border-top: 0.0625rem solid ${({ theme }) => theme.accent};
`;

const StyledCopyright = styled(FaRegCopyright)`
  margin: 0 0.5rem 0 0.25rem;
`;

const Footer = () => {
  return (
    <StyledFooter>
      Copyright <StyledCopyright /> Inderpreet Dhillon
    </StyledFooter>
  );
};

export default Footer;
