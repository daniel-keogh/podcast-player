import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

// @ts-expect-error TS(2307): Cannot find module '@/components/Auth/AuthForm' or... Remove this comment to see the full error message
import AuthForm from "@/components/Auth/AuthForm";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

function Auth() {
  const history = useHistory();

  const handleAuthorized = () => history.replace(Routes.subscriptions);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Switch>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Route path={Routes.auth} exact>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Redirect to={Routes.login} />
      </Route>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Route path={Routes.login}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AuthForm onAuthorized={handleAuthorized} isLogin />
      </Route>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Route path={Routes.register}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AuthForm onAuthorized={handleAuthorized} />
      </Route>
    </Switch>
  );
}

export default Auth;
