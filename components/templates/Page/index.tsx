import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useSpring, animated } from 'react-spring'

import LoadingIcon from '../../atoms/LoadingIcon'
import Header from '../../atoms/Header'
import Footer from '../../atoms/Footer'
import Alert from '../../atoms/Alert'

import { ID_KEY } from '../../../shared/constants'
import { selectAuth, verify } from '../../../slices/auth'

type PageProps = {
  children: React.ReactNode
  title: string
  hideHeader?: any
  hideFooter?: any
}

const Page = ({ children, title, hideHeader, hideFooter }: PageProps) => {
  const dispatch = useAppDispatch()

  const { verified } = useAppSelector(selectAuth)

  const [showLoader, setShowLoader] = React.useState(true)

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
