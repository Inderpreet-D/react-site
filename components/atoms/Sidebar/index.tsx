import { FaBars } from 'react-icons/fa'

import { StyledButton, StyledBackdrop, StyledModal } from './styles'

const Sidebar: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = React.useCallback(e => {
    e.stopPropagation()
    setOpen(false)
  }, [])

  const handleMenuClick = React.useCallback(e => {
    e.stopPropagation()
    setOpen(true)
  }, [])

  return (
    <>
      <StyledButton onClick={handleMenuClick}>
        <FaBars size='2em' />
      </StyledButton>

      {open && <StyledBackdrop onClick={handleClose} />}

      <StyledModal open={open}>{children}</StyledModal>
    </>
  )
}

export default Sidebar
