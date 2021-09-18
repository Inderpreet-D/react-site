import styled from 'styled-components'

import CB from '../Checkbox'
import { Check } from '../Checkbox/styles'

export const Checkbox = styled(CB)`
  margin-right: 0.75rem;
`

export const Item = styled.div`
  display: flex;
  align-items: center;

  &:hover ${Checkbox} {
    border-color: ${({ theme }) => theme.foreground};
  }

  &:hover ${Check} {
    background-color: ${({ theme }) => theme.foregroundDark};
  }
`

interface TextProps {
  readonly checked?: boolean
}

export const Text = styled.div<TextProps>`
  transition: all 750ms;
  cursor: pointer;
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')}
    from-font;
  color: ${({ theme, checked }) => (checked ? theme.foregroundDark : 'white')};
`
