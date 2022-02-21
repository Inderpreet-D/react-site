import styled from 'styled-components'

import Button from '../Button'

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.text};

  &:visited {
    color: ${({ theme }) => theme.foreground};
  }
`

export const StyledButton = styled(Button)`
  text-decoration: underline;
`
