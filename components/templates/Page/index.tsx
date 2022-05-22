import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'

import Header from '../../atoms/Header'
import Footer from '../../atoms/Footer'
import SureDialog from '../../molecules/SureDialog'

import { ID_KEY } from '../../../shared/constants'
import { useAppSelector } from '../../../hooks/redux'
import { selectSure } from '../../../slices/sure'

type PageProps = {
  children: React.ReactNode
  title: string
  hideHeader?: any
  hideFooter?: any
}

const Page = ({ children, title, hideHeader, hideFooter }: PageProps) => {
  const { showing } = useAppSelector(selectSure)

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

      <div className='flex flex-col w-screen h-screen'>
        {!hideHeader && <Header />}

        <div className='flex-grow overflow-auto'>{children}</div>

        {!hideFooter && <Footer />}
      </div>

      {showing && <SureDialog />}
    </>
  )
}

export default Page
