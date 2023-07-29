import clsx from 'clsx'
import { FaBars } from '@react-icons/all-files/fa/FaBars'

type SideBarProps = {
  children: React.ReactNode
}

type MEH = React.MouseEventHandler<HTMLDivElement>

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose: MEH = React.useCallback(e => {
    e.stopPropagation()
    setOpen(false)
  }, [])

  const handleMenuClick: MEH = React.useCallback(e => {
    e.stopPropagation()
    setOpen(true)
  }, [])

  return (
    <>
      <div
        onClick={handleMenuClick}
        className='flex items-center justify-center w-full h-[3.125rem] px-2 py-0 cursor-pointer select-none'
      >
        <FaBars size='2em' />
      </div>

      {open && (
        <div
          onClick={handleClose}
          className='absolute z-10 top-0 left-0 w-screen h-[100svh] bg-black opacity-50'
        />
      )}

      <div
        className={clsx(
          'absolute z-20 top-0 -left-1/4 transition-all duration-500 border-r border-r-dark-light box-border w-1/4 h-[100svh] flex flex-col bg-dark-dark',
          open && '!left-0'
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Sidebar
