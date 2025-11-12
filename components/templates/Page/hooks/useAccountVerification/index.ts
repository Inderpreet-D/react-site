import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import { selectAuth, verify, setRedirect } from "../../../../../slices/auth";

const useAccountVerification = (options: {
  isProtected?: boolean;
  showLoader: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { verified, isLoggedIn } = useAppSelector(selectAuth);

  // Checks if a stored auth token is valid
  React.useEffect(() => {
    dispatch(verify());
  }, [dispatch]);

  // Page requires login so redirect there and back on success
  React.useEffect(() => {
    if (options.isProtected && verified && !isLoggedIn && !options.showLoader) {
      dispatch(setRedirect(router.route));
      router.replace("/account");
    }
  }, [
    options.isProtected,
    verified,
    isLoggedIn,
    options.showLoader,
    dispatch,
    router,
  ]);
};

export default useAccountVerification;
