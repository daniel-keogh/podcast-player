import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';

function Auth() {
    const history = useHistory();

    const onAuthorized = () => history.replace('/subscriptions');

    return (
        <React.Fragment>
            <Route path="/auth" exact>
                <Redirect to="/auth/login" />
            </Route>
            <Route path="/auth/login">
                <AuthForm onAuthorized={onAuthorized} isLogin />
            </Route>
            <Route path="/auth/register">
                <AuthForm onAuthorized={onAuthorized} />
            </Route>
        </React.Fragment>
    );
}

export default Auth;
