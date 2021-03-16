import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

import { StyledWrapper, StyledChildren } from "./Page.styles";
import Header from "../../atoms/Header";
import Footer from "../../atoms/Footer";

import { ID_KEY } from "../../../shared/constants";

const Page = ({ children, title, hideHeader, hideFooter }) => {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem(ID_KEY)) {
      localStorage.setItem(ID_KEY, uuidv4());
    }
  }

  return (
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
};

export default Page;
