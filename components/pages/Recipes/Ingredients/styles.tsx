import styled, { css } from 'styled-components'

import LI from '../../../atoms/ListItem'

const styles = css`
  margin-bottom: 1rem;
`

export const ListItem = styled(LI)`
  ${styles}
`

export const NormalListItem = styled.div`
  ${styles}
  font-weight: bold;
`
