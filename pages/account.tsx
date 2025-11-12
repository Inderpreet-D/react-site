import { useAppSelector } from "../hooks/redux";

import Page from "../components/templates/Page";
import AccountPage from "../components/pages/Account";
import LoginPage from "../components/pages/Login";

import { selectAuth } from "../slices/auth";

const Login = () => {
  const { isLoggedIn } = useAppSelector(selectAuth);

  return (
    <Page title={isLoggedIn ? "Account" : "Login"}>
      {isLoggedIn ? <AccountPage /> : <LoginPage />}
    </Page>
  );
};

export default Login;
