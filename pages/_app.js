import { Fragment, useEffect } from "react";
import Head from "next/head";
import { ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";

import "../styles/globals.css";

const theme = createMuiTheme({ palette: { type: "dark" } });

export default function MyApp(props) {
    const { Component, pageProps } = props;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </Fragment>
    );
}
