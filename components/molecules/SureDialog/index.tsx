import Portal from '../../atoms/Portal'
import Button from '../../atoms/Button'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { selectSure, endCheck } from '../../../slices/sure'

const SureDialog = () => {
  const dispatch = useAppDispatch()
  const {
    title,
    subtitle,
    acceptText,
    declineText,
    onAccept,
    onDecline
  } = useAppSelector(selectSure)

  const bgRef = React.useRef<HTMLDivElement>(null)

  return (
    <Portal>
      <div className='absolute z-20 mx-auto my-4 border-2 border-sky-400 rounded-xl box-border p-5 bg-slate-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-auto min-w-[25%]'>
        <div className='text-2xl font-medium text-sky-400 tracking-[0.0075em] mb-4 text-center'>
          {title}
        </div>

        <div className='overflow-x-hidden overflow-y-auto mx-0 mb-4 flex-1'>
          {subtitle.length > 0 && (
            <div className='mb-8 text-center'>{subtitle}</div>
          )}

          <div className='flex items-center justify-around'>
            <Button onClick={() => onDecline()}>{declineText}</Button>

            <Button onClick={() => onAccept()}>{acceptText}</Button>
          </div>
        </div>
      </div>

      <div
        ref={bgRef}
        onClick={e => {
          e.stopPropagation()

          if (e.target === bgRef.current) {
            dispatch(endCheck())
          }
        }}
        className='absolute top-0 left-0 z-10 w-screen h-screen opacity-50 bg-black'
      />
    </Portal>
  )
}

export default SureDialog
