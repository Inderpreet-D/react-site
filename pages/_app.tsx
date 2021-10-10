import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import SEO from '../next-seo.config'
import theme from '../themes/lightblue'
// import theme from "../themes/bluepurple";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    padding: 0;

    background-color: ${theme.background};
    
    color: ${theme.text};
  }

  #root {
    display: flex;
    flex-direction: column;
    
    height: 100%;
  }
`

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <DefaultSeo {...SEO} />

    <GlobalStyle />

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default MyApp
