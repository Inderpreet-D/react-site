import styled from 'styled-components'

export const Tooltip = styled.div`
  border: 1px solid ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  color: ${({ theme }) => theme.accent};

  & > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
