import styled from "styled-components";

const StyledCard = styled.div`
  flex-direction: column;

  display: flex;

  border: 0.125rem solid ${({ theme }) => theme.foregroundDark};
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1.25rem;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const StyledContent = styled.div`
  flex-direction: column;

  display: flex;

  margin-bottom: 0.5rem;
`;

const StyledTitle = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  margin-bottom: 0.5rem;

  font-size: 1.5rem;
  line-height: 1.235;
  font-weight: 400;
  color: ${({ theme }) => theme.foreground};
  letter-spacing: 0.00735em;
  text-decoration: underline;
`;

const StyledDescription = styled.div`
  font-size: 0.875rem;
  line-height: 1.43;
  font-weight: 400;
  letter-spacing: 0.01071em;
`;

const StyledActions = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;
`;

export {
  StyledCard,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledActions,
};
