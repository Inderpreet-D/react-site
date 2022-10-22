import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useSpring, animated } from 'react-spring'

import { selectAlert, setAlert } from '../../../slices/alert'

const DURATION = 2500

const VisibleAlert = () => {
  const dispatch = useAppDispatch()

  const props = useSpring({
    from: { opacity: 0, bottom: 0 },
    to: async (next, _) => {
      await next({ opacity: 1, bottom: 64 })
      await new Promise(resolve => setTimeout(resolve, DURATION))
      await next({ opacity: 0 })
      dispatch(setAlert(''))
      await next({ bottom: 0 })
    }
  })
  const { alert, isError } = useAppSelector(selectAlert)

  return (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50
      }}
    >
      <div
        className={clsx(
          'border rounded-md shadow-inner  p-4',
          isError
            ? 'bg-red-300 border-red-500 text-red-900'
            : 'bg-green-300 border-green-500 text-green-900'
        )}
      >
        {alert}
      </div>
    </animated.div>
  )
}

const Alert = () => {
  const { alert } = useAppSelector(selectAlert)

  if (!alert) {
    return null
  }

  return <VisibleAlert />
}

export default Alert
