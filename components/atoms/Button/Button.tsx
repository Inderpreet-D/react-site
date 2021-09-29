import { MouseEventHandler } from 'react'
import styled from 'styled-components'

import StyledButton from './Button.styles'

type ButtonProps = React.FunctionComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>

const Button: ButtonProps = ({ onClick, ...props }) => {
  const btnRef = React.useRef<HTMLButtonElement>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    btnRef.current?.blur()

    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return <StyledButton ref={btnRef} onClick={handleClick} {...props} />
}

export default styled(Button)``
