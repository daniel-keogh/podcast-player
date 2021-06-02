import React, { useState } from 'react';
import jwt from 'jwt-decode';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isAuthorized: false,
    login: (token) => {},
    logout: () => {},
});

export function AuthContextProvider(props) {
    const token = localStorage.getItem('token');

    const [auth, setAuth] = useState({
        token,
        isAuthorized: !!token,
        userId: !!token ? jwt(token) : '',
    });

    const login = (token) => {
        const { _id: userId } = jwt(token);

        setAuth({
            token,
            isAuthorized: true,
            userId,
        });

        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({
            token: '',
            isAuthorized: false,
            userId: '',
        });

        localStorage.removeItem('token');
    };

    const context = {
        token: auth.token,
        isAuthorized: auth.isAuthorized,
        userId: auth.userId,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={{ ...context }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
