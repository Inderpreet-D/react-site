import styled from 'styled-components'

import Button from '../../../atoms/Button'

const StyledForm = styled.form`
  justify-content: center;
  align-items: center;

  display: flex;

  & > ${Button} {
    margin-left: 1rem;
  }
`

const StyledButtonHolder = styled.div`
  justify-content: center;

  display: flex;

  margin-bottom: 1.25rem;

  & > ${Button} {
    margin: 0 0.5rem;
  }
`

export { StyledButtonHolder, StyledForm }
