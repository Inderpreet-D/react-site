import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo.config'
import '../styles/index.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <DefaultSeo {...SEO} />

    <Component {...pageProps} />
  </>
)

export default MyApp
