import React, { useState } from 'react';
import jwt from 'jwt-decode';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isAuthorized: false,
    login: (token) => { },
    logout: () => { },
});

export const TOKEN_KEY = 'token';

export function AuthContextProvider(props) {
    const token = localStorage.getItem(TOKEN_KEY);

    const [auth, setAuth] = useState(() => {
        try {
            const { _id: userId } = jwt(token);

            const state = {
                token,
                userId,
                isAuthorized: true,
            };

            return state;
        } catch (err) {
            // invalid token
            localStorage.removeItem(TOKEN_KEY);

            return {
                token: '',
                userId: '',
                isAuthorized: false,
            };
        }
    });

    const login = (token) => {
        const { _id: userId } = jwt(token);

        setAuth({
            token,
            userId,
            isAuthorized: true,
        });

        localStorage.setItem(TOKEN_KEY, token);
    };

    const logout = () => {
        setAuth({
            token: '',
            userId: '',
            isAuthorized: false,
        });

        localStorage.removeItem(TOKEN_KEY);
    };

    const context = {
        token: auth.token,
        userId: auth.userId,
        isAuthorized: auth.isAuthorized,
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
