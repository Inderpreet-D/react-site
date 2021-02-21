import Head from "next/head";

import { StyledWrapper, StyledChildren } from "./Page.styles";
import Header from "../../atoms/Header";
import Footer from "../../atoms/Footer";

const Page = ({ children, title, hideHeader, hideFooter }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <StyledWrapper>
      {!hideHeader && <Header />}

      <StyledChildren>{children}</StyledChildren>

      {!hideFooter && <Footer />}
    </StyledWrapper>
  </>
);

export default Page;
