import { ReactNode } from 'react'
import {
  StyledDialog,
  StyledTitle,
  StyledContent,
  StyledActions,
  StyledBackdrop
} from './styles'

type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  actions: ReactNode
  width?: string
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  actions,
  children,
  width = '50%'
}) => {
  const bgRef = React.useRef<HTMLDivElement>(null)

  const handleBGClick = React.useCallback(
    e => {
      e.stopPropagation()
      if (e.target === bgRef.current) {
        onClose()
      }
    },
    [onClose]
  )

  if (!open) {
    return null
  }

  return (
    <>
      <StyledDialog width={width}>
        <StyledTitle>{title}</StyledTitle>
        <StyledContent>{children}</StyledContent>
        <StyledActions>{actions}</StyledActions>
      </StyledDialog>

      <StyledBackdrop onClick={handleBGClick} ref={bgRef} />
    </>
  )
}

export default Dialog
