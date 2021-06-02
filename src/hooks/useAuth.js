import { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../store/authContext';

function useAuth(isLogin) {
    const [error, setError] = useState('');
    const ctx = useContext(AuthContext);

    const validateForm = (email, password, confirmPassword) => {
        if (
            email.trim().length === 0 ||
            password === '' ||
            (!isLogin && confirmPassword === '')
        ) {
            setError('All fields are required.');
            return false;
        } else if (password.length < 6) {
            setError('Password must be longer than 6 characters.');
            return false;
        } else if (!isLogin && password !== confirmPassword) {
            setError("Passwords don't match.");
            return false;
        }
        return true;
    };

    const sendAuthRequest = ({ email, password, confirmPassword }) => {
        if (!validateForm(email, password, confirmPassword)) {
            return false;
        }

        return axios
            .post(`/api/${isLogin ? 'login' : 'register'}`, {
                email,
                password,
            })
            .then((data) => {
                if (isLogin) {
                    return axios.post('/api/login', {
                        email,
                        password,
                    });
                } else {
                    return data;
                }
            })
            .then((data) => {
                ctx.login(data.data.token);
                return ctx.isAuthorized;
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.msg + '.');
                } else {
                    setError('An error occurred. Try again later.');
                }
                return false;
            });
    };

    return {
        error,
        sendAuthRequest,
    };
}

export default useAuth;
