import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AuthForm from '@/components/Auth/AuthForm';

function Auth() {
    const history = useHistory();

    const handleAuthorized = () => history.replace('/subscriptions');

    return (
        <Switch>
            <Route path="/auth" exact>
                <Redirect to="/auth/login" />
            </Route>
            <Route path="/auth/login">
                <AuthForm onAuthorized={handleAuthorized} isLogin />
            </Route>
            <Route path="/auth/register">
                <AuthForm onAuthorized={handleAuthorized} />
            </Route>
        </Switch>
    );
}

export default Auth;
