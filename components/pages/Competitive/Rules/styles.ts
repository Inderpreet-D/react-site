import styled from 'styled-components'

import MD from '../../../atoms/Markdown'

export const OrderedList = styled.ul`
  & > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const Item = styled.li``

export const BanItem = styled(Item)`
  color: #d43b7b;
`

export const GeneralItem = styled(Item)`
  color: ${({ theme }) => theme.foregroundDark};
`

export const Markdown = styled(MD)`
  & a {
    color: inherit;
  }
`
