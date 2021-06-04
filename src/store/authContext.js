import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isAuthorized: false,
    login: (token) => {},
    logout: () => {},
});

export const TOKEN_KEY = 'token';

/**
 * Adds JWT to any future request headers.
 * @param {string} token A JSON Web Token.
 */
function setAuthHeader(token) {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    };
}

export function AuthContextProvider(props) {
    const token = localStorage.getItem(TOKEN_KEY);

    const [auth, setAuth] = useState(() => {
        const state = {
            token,
            isAuthorized: !!token,
            userId: !!token ? jwt(token)._id : '',
        };

        if (state.isAuthorized) {
            setAuthHeader(token);
        }

        return state;
    });

    const login = (token) => {
        const { _id: userId } = jwt(token);

        setAuth({
            token,
            isAuthorized: true,
            userId,
        });

        setAuthHeader(token);
        localStorage.setItem(TOKEN_KEY, token);
    };

    const logout = () => {
        setAuth({
            token: '',
            isAuthorized: false,
            userId: '',
        });

        localStorage.removeItem(TOKEN_KEY);
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
