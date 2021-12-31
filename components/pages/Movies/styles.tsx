import styled from 'styled-components'

import BaseButton from '../../atoms/Button'

const Movie = styled.div`
  margin: 1rem 0 2rem 0;
  text-align: center;
  font-size: 3rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.foreground};
`

const Button = styled(BaseButton)`
  display: flex;
  margin: 0 auto;
`

export { Movie, Button }
