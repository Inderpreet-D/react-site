import { createPortal } from 'react-dom'

import { PORTAL_ID } from '../../../pages/_document'

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)

  //  Updates mounted status
  React.useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return null
  }

  if (!mounted) {
    return null
  }

  const portal = document.querySelector(`#${PORTAL_ID}`)!
  return createPortal(children, portal)
}

export default Portal
