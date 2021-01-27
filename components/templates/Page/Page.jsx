import styled from "styled-components";
import Head from "next/head";
import PropTypes from "prop-types";

import Toolbar from "../../organisms/Toolbar";
import Footer from "../../atoms/Footer";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const StyledChildren = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Page = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <StyledWrapper>
      <Toolbar />

      <StyledChildren>{children}</StyledChildren>

      <Footer />
    </StyledWrapper>
  </>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
