import clsx from 'clsx'
import { useAppSelector } from '../../../hooks/redux'

import { selectAlert } from '../../../slices/alert'

const Alert = () => {
  const { alert, isError } = useAppSelector(selectAlert)

  if (!alert) {
    return null
  }

  // TODO: Style

  return (
    <div className='border-red-800 border absolute bottom-16 left-1/2 -translate-x-1/2 z-50'>
      HERE - {alert} - {isError.toString()}
    </div>
  )
}

export default Alert
