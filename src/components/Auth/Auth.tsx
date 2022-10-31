import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import AuthForm from "@/components/Auth/AuthForm";
import Routes from "@/utils/routes";

function Auth() {
  const history = useHistory();

  const handleAuthorized = () => history.replace(Routes.subscriptions);

  return (
    <Switch>
      <Route path={Routes.auth} exact>
        <Redirect to={Routes.login} />
      </Route>
      <Route path={Routes.login}>
        <AuthForm onAuthorized={handleAuthorized} isLogin />
      </Route>
      <Route path={Routes.register}>
        <AuthForm onAuthorized={handleAuthorized} />
      </Route>
    </Switch>
  );
}

export default Auth;
