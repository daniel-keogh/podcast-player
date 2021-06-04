import { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../store/authContext';

function useAuth() {
    const [error, setError] = useState('');

    const ctx = useContext(AuthContext);

    const resetError = () => setError('');

    const isValidForm = ({ email, password, confirmPassword }) => {
        if (
            password === '' ||
            (confirmPassword !== undefined && confirmPassword === '') ||
            (email !== undefined && email.trim().length === 0)
        ) {
            setError('All fields are required.');
            return false;
        } else if (password.length < 6) {
            setError('Password must be longer than 6 characters.');
            return false;
        } else if (
            confirmPassword !== undefined &&
            password !== confirmPassword
        ) {
            setError("Passwords don't match.");
            return false;
        }
        return true;
    };

    const login = ({ email, password }) => {
        if (!isValidForm({ email, password })) {
            return Promise.resolve(false);
        }

        return axios
            .post(`/api/login`, {
                email,
                password,
            })
            .then((data) => {
                ctx.login(data.data.token);
                return ctx.isAuthorized;
            })
            .catch(handleError);
    };

    const register = ({ email, password, confirmPassword }) => {
        if (!isValidForm({ email, password, confirmPassword })) {
            return Promise.resolve(false);
        }

        return axios
            .post('/api/register', {
                email,
                password,
            })
            .then(() => {
                return axios.post('/api/login', {
                    email,
                    password,
                });
            })
            .then((data) => {
                ctx.login(data.data.token);
                return ctx.isAuthorized;
            })
            .catch(handleError);
    };

    const updateEmail = ({ email }) => {
        if (!isValidForm({ email })) {
            return Promise.resolve(false);
        }

        return axios
            .put(`/api/users/${ctx.userId}`, {
                email,
            })
            .then((data) => {
                return data.status === 200;
            })
            .catch(handleError);
    };

    const updatePassword = ({ oldPassword, password, confirmPassword }) => {
        if (!isValidForm({ password, confirmPassword })) {
            return Promise.resolve(false);
        }

        return axios
            .put(`/api/auth/password_reset`, {
                oldPassword,
                password,
            })
            .then((data) => {
                return data.status === 200;
            })
            .catch(handleError);
    };

    const deleteAccount = ({ email, password }) => {
        if (!isValidForm({ email, password })) {
            return Promise.resolve(false);
        }

        return login({ email, password })
            .then(() => {
                return axios
                    .delete(`/api/users/${ctx.userId}`, {
                        email,
                        password,
                    })
                    .then((data) => {
                        return data.status === 204;
                    });
            })
            .catch(handleError);
    };

    const handleError = (err) => {
        if (err.response) {
            setError(err.response.data.msg + '.');
        } else {
            setError('An error occurred. Try again later.');
        }
        return false;
    };

    return {
        error,
        resetError,
        login,
        register,
        updateEmail,
        updatePassword,
        deleteAccount,
    };
}

export default useAuth;
