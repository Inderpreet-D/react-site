import styled from 'styled-components'

import Container from '../../atoms/Container'

export const ErrorBox = styled(Container)`
  position: absolute;
  left: 50%;
  top: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: max-content;
  transform: translate(-50%, -50%);
`

export const Link = styled.a`
  cursor: pointer;
  color: ${({ theme }) => theme.foreground};

  &:hover {
    text-decoration: underline;
  }
`
