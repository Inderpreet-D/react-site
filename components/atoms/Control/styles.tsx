import styled from 'styled-components'

import Button from '../Button'

export const ControlButton = styled(Button)`
  justify-content: center;
  align-items: center;

  display: flex;

  height: 100%;
`

export const Controls = styled.div`
  justify-content: center;
  align-items: center;

  display: flex;

  margin-bottom: 0.5rem;

  font-size: 1.5rem;

  & > ${ControlButton}:first-child {
    margin-right: 1rem;
  }

  & > ${ControlButton}:last-child {
    margin-left: 1rem;
  }
`
