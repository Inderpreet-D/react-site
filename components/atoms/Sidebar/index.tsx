import clsx from 'clsx'
import { FaBars } from '@react-icons/all-files/fa/FaBars'

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
      <div
        onClick={handleMenuClick}
        className='flex items-center justify-center w-full h-[3.125rem] px-2 py-0 cursor-pointer select-none'
      >
        <FaBars size='2em' />
      </div>

      {open && (
        <div
          onClick={handleClose}
          className='absolute z-10 top-0 left-0 w-screen h-screen bg-black opacity-50'
        />
      )}

      <div
        className={clsx(
          'absolute z-20 top-0 -left-1/4 transition-all duration-500 border-r border-r-slate-400 box-border w-1/4 h-screen bg-slate-900',
          open && '!left-0'
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Sidebar
