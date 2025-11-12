import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useSpring, animated } from "react-spring";

import SocketProvider from "./providers/SocketProvider";

import LoadingIcon from "../../atoms/LoadingIcon";
import Header from "../../atoms/Header";
import Footer from "../../atoms/Footer";
import Alert from "../../atoms/Alert";

import { selectAuth, clearRedirect } from "../../../slices/auth";
import useAccountVerification from "./hooks/useAccountVerification";

type PageProps = {
  children: React.ReactNode;
  title: string;
  hideHeader?: any;
  hideFooter?: any;
  isProtected?: boolean;
};

const Page: React.FC<PageProps> = ({
  children,
  title,
  hideHeader,
  hideFooter,
  isProtected,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { verified, isLoggedIn, redirect } = useAppSelector(selectAuth);

  const [showLoader, setShowLoader] = React.useState(!verified);

  const props = useSpring({
    from: { opacity: 1 },
    to: { opacity: verified ? 0 : 1 },
    delay: 500,
    onRest: { opacity: () => setShowLoader(false) },
  });

  useAccountVerification({ isProtected, showLoader });

  // Redirect back to protected page
  if (isLoggedIn && redirect) {
    dispatch(clearRedirect());
    router.replace(redirect);
  }

  return (
    <SocketProvider>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="relative flex flex-col w-screen h-[100svh]">
        {!hideHeader && <Header />}

        <main className="flex-grow overflow-auto">{children}</main>

        {!hideFooter && <Footer />}

        {showLoader && (
          <animated.div
            className="absolute bg-black w-screen h-[100svh] flex justify-center"
            style={props}
          >
            <LoadingIcon />
          </animated.div>
        )}

        <Alert />
      </div>
    </SocketProvider>
  );
};

export default Page;
