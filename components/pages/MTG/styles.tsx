import styled from 'styled-components'

import LinkBtn from '../../atoms/LinkButton'

export const Info = styled.div`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`

export const LinkButton = styled(LinkBtn)``

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: fit-content;

  & > ${LinkButton}:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`
