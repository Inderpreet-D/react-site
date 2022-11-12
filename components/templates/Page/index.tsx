import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useSpring, animated } from 'react-spring'

import LoadingIcon from '../../atoms/LoadingIcon'
import Header from '../../atoms/Header'
import Footer from '../../atoms/Footer'
import Alert from '../../atoms/Alert'

import { ID_KEY } from '../../../shared/constants'
import {
  selectAuth,
  verify,
  setRedirect,
  clearRedirect
} from '../../../slices/auth'

type PageProps = {
  children: React.ReactNode
  title: string
  hideHeader?: any
  hideFooter?: any
  isProtected?: boolean
}

const Page: React.FC<PageProps> = ({
  children,
  title,
  hideHeader,
  hideFooter,
  isProtected
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { verified, isLoggedIn, redirect } = useAppSelector(selectAuth)

  const [showLoader, setShowLoader] = React.useState(!verified)

  const props = useSpring({
    from: { opacity: 1 },
    to: { opacity: verified ? 0 : 1 },
    delay: 500,
    onRest: { opacity: () => setShowLoader(false) }
  })

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem(ID_KEY)) {
      // TODO: Remove this
      localStorage.setItem(ID_KEY, uuidv4())
    }
  }

  // Checks if a stored auth token is valid
  React.useEffect(() => {
    dispatch(verify())
  }, [dispatch])

  // Page requires login so redirect there and back on success
  React.useEffect(() => {
    if (isProtected && verified && !isLoggedIn && !showLoader) {
      dispatch(setRedirect(router.route))
      router.replace('/account')
    }
  }, [isProtected, verified, isLoggedIn, showLoader, dispatch, router])

  // Redirect back to protected page
  if (isLoggedIn && redirect) {
    dispatch(clearRedirect())
    router.replace(redirect)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='relative flex flex-col w-screen h-screen'>
        {!hideHeader && <Header />}

        <main className='flex-grow overflow-auto'>{children}</main>

        {!hideFooter && <Footer />}

        {showLoader && (
          <animated.div
            className='absolute bg-black w-screen h-screen flex justify-center'
            style={props}
          >
            <LoadingIcon />
          </animated.div>
        )}

        <Alert />
      </div>
    </>
  )
}

export default Page
