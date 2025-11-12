import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";
import { store } from "../store";
import "../styles/index.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const AppComponent = Component as any;

  return (
    <Provider store={store}>
      <DefaultSeo {...SEO} />

      <AppComponent {...pageProps} />
    </Provider>
  );
};

export default MyApp;
