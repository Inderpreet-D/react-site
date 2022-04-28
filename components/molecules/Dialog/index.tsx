import Portal from '../../atoms/Portal'
import Container from '../../atoms/Container'

type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  actions: React.ReactNode
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
    <Portal>
      <Container
        className='!absolute z-20 top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col'
        style={{ width }}
      >
        <div className='text-2xl font-medium text-sky-400 tracking-[0.0075em]'>
          {title}
        </div>

        <div className='overflow-x-hidden overflow-y-auto mx-0 my-6 flex-1'>
          {children}
        </div>

        <div className='flex items-center justify-end flex-shrink-0 flex-grow-0 basis-auto'>
          {actions}
        </div>
      </Container>

      <div
        ref={bgRef}
        onClick={handleBGClick}
        className='absolute top-0 left-0 z-10 w-screen h-screen opacity-50 bg-black'
      />
    </Portal>
  )
}

export default Dialog
