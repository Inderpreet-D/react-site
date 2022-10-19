import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'

import Header from '../../atoms/Header'
import Footer from '../../atoms/Footer'
import Alert from '../../atoms/Alert'

import { ID_KEY } from '../../../shared/constants'

type PageProps = {
  children: React.ReactNode
  title: string
  hideHeader?: any
  hideFooter?: any
}

const Page = ({ children, title, hideHeader, hideFooter }: PageProps) => {
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem(ID_KEY)) {
      localStorage.setItem(ID_KEY, uuidv4())
    }
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

        <Alert />
      </div>
    </>
  )
}

export default Page
