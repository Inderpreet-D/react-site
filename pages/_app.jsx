import App from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "../themes/lightblue";
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
    flex-direction: column;
    
    display: flex;
    
    height: 100%;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyle />

        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
