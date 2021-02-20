import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa";

const StyledFooter = styled.div`
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  display: flex;

  border-top: 0.0625rem solid ${({ theme }) => theme.accent};
  box-sizing: border-box;
  padding: 0.75rem;

  background-color: ${({ theme }) => theme.backgroundLight};

  color: ${({ theme }) => theme.text};
`;

const StyledCopyright = styled(FaRegCopyright)`
  margin: 0 0.5rem 0 0.25rem;
`;

export { StyledFooter, StyledCopyright };
