import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa";

const StyledFooter = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const Footer = () => {
  return (
    <StyledFooter>
      Copyright <FaRegCopyright /> Inderpreet Dhillon
    </StyledFooter>
  );
};

export default Footer;
